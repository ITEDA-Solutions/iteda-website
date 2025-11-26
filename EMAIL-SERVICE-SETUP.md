# 📧 Email Service Setup Guide - Resend + React Email

## ✅ **Current Status**

**Email System**: Fully implemented and ready to use!

### **What's Already Done:**

1. ✅ **React Email** installed (`react-email`, `@react-email/components`)
2. ✅ **Resend SDK** installed
3. ✅ **Email templates** created (`src/emails/templates.tsx`)
4. ✅ **Contact API** configured (`src/app/api/contact/route.ts`)
5. ✅ **Contact form** ready (`src/components/sections/contact-form-enhanced.tsx`)

**You just need to configure the API keys!**

---

## 🚀 **Quick Setup (5 Minutes)**

### **Step 1: Create Resend Account**

1. **Go to**: https://resend.com
2. **Click**: "Sign Up" (free tier: 100 emails/day, 3,000/month)
3. **Sign up** with GitHub or email
4. **Verify** your email address

### **Step 2: Verify Your Domain**

**Option A: Use Resend's Test Domain (Quick Start)**
- Resend provides `onboarding@resend.dev` for testing
- Can send to your own email immediately
- Skip to Step 3

**Option B: Use Your Own Domain (Production)**
1. Go to **Domains** → **Add Domain**
2. Enter: `itedasolutions.com`
3. Add DNS records provided by Resend:
   ```
   Type: TXT
   Name: _resend
   Value: [provided by Resend]
   
   Type: MX
   Name: @
   Priority: 10
   Value: [provided by Resend]
   ```
4. **Wait** 5-10 minutes for verification
5. **Verify** domain status shows "Active"

### **Step 3: Get API Key**

1. Go to: https://resend.com/api-keys
2. Click **"Create API Key"**
3. **Name**: "ITEDA Website Production"
4. **Permission**: "Full Access"
5. Click **"Create"**
6. **Copy the API key** (starts with `re_`)
   
   ⚠️ **IMPORTANT**: Save this key immediately! You can't view it again!

---

## ⚙️ **Configuration**

### **Step 4: Add Environment Variables**

**Local Development** (`.env.local`):

Create/update `c:\Apache24\htdocs\iteda-website\.env.local`:

```env
# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email Addresses
COMPANY_EMAIL=info@itedasolutions.com
FROM_EMAIL=noreply@itedasolutions.com

# Optional: CAPTCHA (Cloudflare Turnstile)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...
TURNSTILE_SECRET_KEY=0x4AAAAAAA...
```

**Production (Vercel Dashboard)**:

1. Go to: https://vercel.com/iteda-solutions/iteda-website/settings/environment-variables
2. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `RESEND_API_KEY` | `re_xxxx...` | Production, Preview, Development |
| `COMPANY_EMAIL` | `info@itedasolutions.com` | Production, Preview, Development |
| `FROM_EMAIL` | `noreply@itedasolutions.com` | Production, Preview, Development |

3. Click **"Save"**
4. **Redeploy** your site

---

## 🧪 **Testing**

### **Step 5: Test Email Sending**

#### **Test on Local Development:**

1. **Restart your dev server**:
   ```bash
   # Stop with Ctrl+C
   npm run dev
   ```

2. **Open**: http://localhost:3000#contact

3. **Fill out the form**:
   - Name: Test User
   - Email: your-email@example.com
   - Message: Testing email service

4. **Click**: "Send Message"

5. **Check your inbox**:
   - ✅ You should receive a confirmation email
   - ✅ Check `info@itedasolutions.com` for admin notification

#### **Check Resend Dashboard:**

1. Go to: https://resend.com/emails
2. You should see:
   - ✅ Email status: "Delivered"
   - ✅ Recipient: your-email@example.com
   - ✅ Subject: "Thank you for contacting ITEDA Solutions"

---

## 📧 **Email Templates**

### **What Emails Are Sent:**

#### **1. Admin Notification Email**
**To**: `COMPANY_EMAIL` (info@itedasolutions.com)  
**From**: `ITEDA Contact Form <noreply@itedasolutions.com>`  
**Reply-To**: Customer's email  
**Subject**: "New Contact Form Submission: [Subject]"

**Contains**:
- Customer name
- Customer email
- Company (if provided)
- Phone (if provided)
- Subject (if provided)
- Message
- Professional formatting with brand colors

#### **2. Customer Confirmation Email**
**To**: Customer's email  
**From**: `ITEDA Solutions <noreply@itedasolutions.com>`  
**Subject**: "Thank you for contacting ITEDA Solutions"

**Contains**:
- Personalized greeting
- Confirmation of message received
- Response time expectation (24-48 hours)
- Company contact information
- Professional formatting

---

## 🎨 **Email Preview (Development)**

### **Preview Templates Before Sending:**

```bash
# Install React Email CLI (optional)
npm install -g react-email

# Preview emails in browser
npx react-email dev
```

This opens a browser at `http://localhost:3000` showing:
- ✅ Admin notification email
- ✅ Customer confirmation email
- ✅ Live preview with your actual content
- ✅ Test different screen sizes

---

## 📊 **Email Limits & Pricing**

### **Resend Free Tier:**
- **100 emails/day**
- **3,000 emails/month**
- **All features included**
- **No credit card required**

### **Resend Pro ($20/month):**
- **50,000 emails/month**
- **Dedicated IP**
- **Custom domains**
- **Priority support**

**For most small businesses, the free tier is sufficient!**

---

## 🔧 **Advanced Configuration**

### **Custom From Name:**

Update `src/app/api/contact/route.ts`:

```typescript
from: `ITEDA Support Team <${fromEmail}>`,
// or
from: `${formData.name} via ITEDA <${fromEmail}>`,
```

### **Add CC/BCC:**

```typescript
await resend.emails.send({
  from: `ITEDA Contact Form <${fromEmail}>`,
  to: companyEmail,
  cc: ['manager@itedasolutions.com'],
  bcc: ['archive@itedasolutions.com'],
  // ... rest of config
});
```

### **Add Attachments:**

```typescript
await resend.emails.send({
  from: `ITEDA <${fromEmail}>`,
  to: formData.email,
  subject: 'Welcome!',
  html: emailHtml,
  attachments: [
    {
      filename: 'brochure.pdf',
      path: './public/brochure.pdf',
    },
  ],
});
```

---

## 🎯 **Customizing Email Templates**

### **Edit Templates:**

File: `src/emails/templates.tsx`

#### **Change Email Content:**

```tsx
// Update admin email heading
<Heading style={h1}>
  New Inquiry from Website  {/* Changed from "New Contact Form Submission" */}
</Heading>

// Add custom sections
<Section style={section}>
  <Text style={label}>Priority:</Text>
  <Text style={value}>High</Text>
</Section>
```

#### **Change Brand Colors:**

```tsx
const h1 = {
  color: "#028037",  // Use your brand green
  fontSize: "24px",
  fontWeight: "bold",
};

const link = {
  color: "#028037",  // Use your brand green
  textDecoration: "underline",
};
```

#### **Add Logo to Emails:**

```tsx
import { Img } from '@react-email/components';

<Img
  src="https://itedasolutions.com/logo.png"
  alt="ITEDA Solutions"
  width="180"
  height="60"
/>
```

---

## 🔍 **Troubleshooting**

### **Emails Not Sending?**

#### **1. Check API Key**
```bash
# Test API key
curl https://api.resend.com/emails \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

#### **2. Check Environment Variables**
```bash
# In terminal
echo $env:RESEND_API_KEY  # Should show your key
```

#### **3. Check Resend Dashboard**
- Go to: https://resend.com/emails
- Look for failed emails
- Check error messages

#### **4. Check Browser Console**
- Press F12
- Go to Console tab
- Look for errors when submitting form

### **Emails Going to Spam?**

#### **Solutions:**
1. ✅ **Verify your domain** in Resend
2. ✅ **Set up SPF/DKIM records** (provided by Resend)
3. ✅ **Use professional from address** (not Gmail/Yahoo)
4. ✅ **Warm up your domain** (send gradually increasing emails)
5. ✅ **Avoid spam trigger words** in subject/content

### **Email Formatting Issues?**

#### **Test in Multiple Clients:**
- Gmail
- Outlook
- Apple Mail
- Mobile devices

#### **Use Email Testing Tools:**
- Litmus: https://litmus.com
- Email on Acid: https://www.emailonacid.com

---

## 📈 **Monitoring & Analytics**

### **Track Email Performance:**

1. **Go to**: https://resend.com/emails
2. **View**:
   - ✅ Delivery rate
   - ✅ Open rate
   - ✅ Click rate
   - ✅ Bounce rate
   - ✅ Spam complaints

### **Set Up Webhooks (Optional):**

```typescript
// Handle email events
export async function POST(request: Request) {
  const event = await request.json();
  
  switch (event.type) {
    case 'email.delivered':
      // Log successful delivery
      break;
    case 'email.bounced':
      // Handle bounce
      break;
  }
}
```

---

## ✅ **Setup Checklist**

- [ ] Create Resend account
- [ ] Verify domain (or use test domain)
- [ ] Generate API key
- [ ] Add environment variables locally
- [ ] Test email sending locally
- [ ] Add environment variables to Vercel
- [ ] Deploy to production
- [ ] Test email sending on production
- [ ] Monitor Resend dashboard
- [ ] Set up SPF/DKIM records (for production domain)

---

## 🎯 **Next Steps**

### **After Setup:**

1. **Test thoroughly** with different email providers
2. **Monitor** delivery rates in Resend dashboard
3. **Customize** email templates to match your brand
4. **Set up** domain verification for production
5. **Consider** upgrading to Pro if you need more volume

---

## 📚 **Resources**

- **Resend Docs**: https://resend.com/docs
- **React Email Docs**: https://react.email
- **Resend API Reference**: https://resend.com/docs/api-reference
- **Email Templates**: https://react.email/examples
- **Vercel Email Guide**: https://vercel.com/guides/sending-emails

---

## 💡 **Pro Tips**

1. **Test with real email addresses** from different providers
2. **Keep templates simple** for better compatibility
3. **Use inline CSS** (React Email does this automatically)
4. **Monitor bounce rates** and update your list
5. **Set up custom domain** for better deliverability
6. **Warm up new domains** gradually
7. **Keep track of email quotas** (100/day on free tier)

---

## 🆘 **Support**

**Need Help?**

1. **Resend Support**: support@resend.com
2. **Resend Discord**: https://resend.com/discord
3. **React Email Issues**: https://github.com/resendlabs/react-email/issues

---

**Your email service is ready to go!** 🎉

Just add your Resend API key and start sending professional emails!

**Last Updated**: 2025-11-24  
**Setup Time**: 5 minutes  
**Status**: ✅ Production Ready
