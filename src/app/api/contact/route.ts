import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import rateLimiter from '@/lib/rate-limiter';
import {
  AdminEmailTemplate,
  CustomerEmailTemplate
} from '@/emails/templates';
import { render } from '@react-email/components';

// Initialize Resend (Vercel's recommended email provider)
// Note: Vercel integrates seamlessly with Resend for email delivery
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100, 'Company name is too long').optional(),
  phone: z.string().max(20, 'Phone number is too long').optional(),
  subject: z.string().max(200, 'Subject is too long').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
  captchaToken: z.string().optional(), // Cloudflare Turnstile token
});

// Verify Cloudflare Turnstile token
async function verifyCaptcha(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.warn('TURNSTILE_SECRET_KEY not configured, skipping CAPTCHA verification');
    return true; // Skip verification if not configured (development mode)
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: ip,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return false;
  }
}

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (real) {
    return real.trim();
  }

  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // Check rate limit
    const rateLimit = rateLimiter.check(clientIP);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          resetIn: Math.ceil(rateLimit.resetIn / 1000), // seconds
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + rateLimit.resetIn).toISOString(),
            'Retry-After': String(Math.ceil(rateLimit.resetIn / 1000)),
          }
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // Verify CAPTCHA if token provided
    if (formData.captchaToken) {
      const captchaValid = await verifyCaptcha(formData.captchaToken, clientIP);

      if (!captchaValid) {
        return NextResponse.json(
          { error: 'CAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const companyEmail = process.env.COMPANY_EMAIL || 'info@itedasolutions.com';
    const fromEmail = process.env.FROM_EMAIL || 'noreply@itedasolutions.com';

    // Render email templates using React Email
    const adminEmailHtml = await render(
      AdminEmailTemplate({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      })
    );

    // Send email to company
    const adminEmailResult = await resend.emails.send({
      from: `ITEDA Contact Form <${fromEmail}>`,
      to: companyEmail,
      replyTo: formData.email,
      subject: `New Contact Form Submission${formData.subject ? `: ${formData.subject}` : ''}`,
      html: adminEmailHtml,
    });

    if (adminEmailResult.error) {
      console.error('Error sending admin email:', adminEmailResult.error);
      throw new Error('Failed to send notification email');
    }

    // Send confirmation email to customer
    try {
      const customerEmailHtml = await render(
        CustomerEmailTemplate({
          name: formData.name,
        })
      );

      await resend.emails.send({
        from: `ITEDA Solutions <${fromEmail}>`,
        to: formData.email,
        subject: 'Thank you for contacting ITEDA Solutions',
        html: customerEmailHtml,
      });
    } catch (error) {
      // Don't fail the whole request if customer email fails
      console.error('Error sending customer confirmation email:', error);
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': String(rateLimit.remaining),
          'X-RateLimit-Reset': new Date(Date.now() + rateLimit.resetIn).toISOString(),
        }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        error: 'An error occurred while processing your request. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { status: 200 });
}
