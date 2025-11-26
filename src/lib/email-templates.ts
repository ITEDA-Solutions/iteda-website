/**
 * Email Templates for Contact Form
 */

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject?: string;
  message: string;
}

export function generateAdminEmailHTML(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                📩 New Contact Form Submission
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #666; font-size: 16px;">
                You have received a new message from your website contact form.
              </p>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border-bottom: 1px solid #e9ecef;">
                    <strong style="color: #333;">Name:</strong>
                  </td>
                  <td style="padding: 12px; background-color: #f8f9fa; border-bottom: 1px solid #e9ecef;">
                    ${data.name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e9ecef;">
                    <strong style="color: #333;">Email:</strong>
                  </td>
                  <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e9ecef;">
                    <a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">
                      ${data.email}
                    </a>
                  </td>
                </tr>
                ${data.company ? `
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border-bottom: 1px solid #e9ecef;">
                    <strong style="color: #333;">Company:</strong>
                  </td>
                  <td style="padding: 12px; background-color: #f8f9fa; border-bottom: 1px solid #e9ecef;">
                    ${data.company}
                  </td>
                </tr>
                ` : ''}
                ${data.phone ? `
                <tr>
                  <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e9ecef;">
                    <strong style="color: #333;">Phone:</strong>
                  </td>
                  <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e9ecef;">
                    <a href="tel:${data.phone}" style="color: #667eea; text-decoration: none;">
                      ${data.phone}
                    </a>
                  </td>
                </tr>
                ` : ''}
                ${data.subject ? `
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border-bottom: 1px solid #e9ecef;">
                    <strong style="color: #333;">Subject:</strong>
                  </td>
                  <td style="padding: 12px; background-color: #f8f9fa; border-bottom: 1px solid #e9ecef;">
                    ${data.subject}
                  </td>
                </tr>
                ` : ''}
              </table>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #333; font-size: 16px;">Message:</strong>
              </div>
              
              <div style="padding: 20px; background-color: #f8f9fa; border-left: 4px solid #667eea; border-radius: 4px;">
                <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
${data.message}
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; color: #999; font-size: 14px;">
                This email was sent from your ITEDA Solutions website contact form.
              </p>
              <p style="margin: 10px 0 0; color: #999; font-size: 12px;">
                Received on ${new Date().toLocaleString('en-US', { 
                  dateStyle: 'full', 
                  timeStyle: 'short' 
                })}
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function generateAdminEmailText(data: ContactFormData): string {
  return `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}\n` : ''}${data.phone ? `Phone: ${data.phone}\n` : ''}${data.subject ? `Subject: ${data.subject}\n` : ''}
Message:
${data.message}

---
Received on ${new Date().toLocaleString()}
  `.trim();
}

export function generateCustomerEmailHTML(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Us</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                Thank You! ✨
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #333; font-size: 18px; font-weight: bold;">
                Hi ${data.name},
              </p>
              
              <p style="margin: 0 0 20px; color: #666; font-size: 16px; line-height: 1.6;">
                Thank you for reaching out to <strong>ITEDA Solutions</strong>! We've received your message and appreciate you taking the time to contact us.
              </p>
              
              <p style="margin: 0 0 20px; color: #666; font-size: 16px; line-height: 1.6;">
                Our team will review your inquiry and get back to you within <strong>24-48 hours</strong>.
              </p>
              
              <div style="padding: 20px; background-color: #f8f9fa; border-left: 4px solid #667eea; border-radius: 4px; margin: 30px 0;">
                <p style="margin: 0 0 10px; color: #333; font-size: 14px; font-weight: bold;">
                  Your message:
                </p>
                <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${data.message}
                </p>
              </div>
              
              <p style="margin: 20px 0 0; color: #666; font-size: 16px; line-height: 1.6;">
                In the meantime, feel free to explore our <a href="https://itedasolutions.com" style="color: #667eea; text-decoration: none; font-weight: bold;">website</a> or check out our products.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0 0 15px; color: #333; font-size: 16px; font-weight: bold;">
                ITEDA Solutions
              </p>
              <p style="margin: 0; color: #999; font-size: 14px;">
                Transforming agriculture with innovative IoT solutions
              </p>
              <p style="margin: 15px 0 0;">
                <a href="https://itedasolutions.com" style="color: #667eea; text-decoration: none; margin: 0 10px; font-size: 14px;">Website</a>
                <span style="color: #ddd;">|</span>
                <a href="mailto:info@itedasolutions.com" style="color: #667eea; text-decoration: none; margin: 0 10px; font-size: 14px;">Email</a>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
