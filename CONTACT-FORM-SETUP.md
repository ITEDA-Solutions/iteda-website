# Contact Form - Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Sign Up for Resend (Email Service)

1. Go to https://resend.com and create a free account
2. Click "API Keys" in the sidebar
3. Click "Create API Key"
4. Copy your API key (starts with `re_`)

### Step 2: Configure Resend

**For Development (Testing):**
- Resend allows you to send emails to **any email address you've verified**
- Add your personal email in Resend dashboard → Verified Emails
- You'll receive a verification email - click the link

**For Production:**
- Add and verify your domain (e.g., itedasolutions.com)
- Add DNS records (SPF, DKIM, DMARC) provided by Resend
- Wait for verification (usually 10-30 minutes)

### Step 3: Get Cloudflare Turnstile Keys (Optional but Recommended)

1. Go to https://dash.cloudflare.com/
2. Sign in or create account (free)
3. Click "Turnstile" in sidebar
4. Click "Add Site"
5. Configure:
   - **Site Name:** ITEDA Contact Form
   - **Domain:** localhost (for development) or your domain
   - **Widget Mode:** Managed (recommended)
6. Copy both keys:
   - Site Key (public, starts with `0x4AAAA...`)
   - Secret Key (private, starts with `0x4AAAA...`)

### Step 4: Update Environment Variables

Open `.env.local` and replace the placeholder values:

```env
# Replace these with your actual keys
RESEND_API_KEY=re_YOUR_ACTUAL_KEY_HERE
COMPANY_EMAIL=your-email@example.com
FROM_EMAIL=noreply@yourdomain.com

# Optional: Cloudflare Turnstile (recommended for production)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAA_YOUR_SITE_KEY
TURNSTILE_SECRET_KEY=0x4AAAA_YOUR_SECRET_KEY
```

**Important Notes:**
- For development, use your verified email as `COMPANY_EMAIL`
- `FROM_EMAIL` can be any email@yourdomain.com (doesn't need to exist)
- CAPTCHA keys are optional for local testing

### Step 5: Restart Servers

```bash
# Stop current servers (Ctrl+C in both terminals)

# Terminal 1 - CMS
cd cms/cms-poc
npm run dev

# Terminal 2 - Frontend  
npm run dev
```

### Step 6: Test the Form

1. Visit: http://localhost:3000/#contact
2. Fill out the form:
   - Name: Test User
   - Email: your-verified-email@example.com
   - Message: This is a test message
3. Click "Send Message"
4. Check your email inbox for:
   - Admin notification (to COMPANY_EMAIL)
   - Customer confirmation (to submitted email)

---

## 📧 Development Mode (Without CAPTCHA)

If you don't want to set up CAPTCHA immediately:

1. Leave CAPTCHA keys empty in `.env.local`
2. Form will work without CAPTCHA
3. Add CAPTCHA before deploying to production

---

## 🐛 Troubleshooting

### "Email service not configured" error
- Check that `RESEND_API_KEY` is set in `.env.local`
- Verify the API key is correct (starts with `re_`)
- Restart the frontend server

### "Validation failed" error
- Make sure all required fields are filled
- Email must be valid format
- Message must be at least 10 characters

### Not receiving emails
- Check Resend dashboard → Logs
- Verify your email in Resend dashboard
- Check spam folder
- Make sure `COMPANY_EMAIL` is a verified email in development

### CAPTCHA not showing
- Check `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set
- Verify browser console for script loading errors
- Try disabling browser extensions

### Rate limit exceeded
- Wait 60 seconds and try again
- Default: 5 submissions per minute per IP
- Adjust in `src/lib/rate-limiter.ts` if needed

---

## 🎯 Testing Checklist

- [ ] Form displays correctly
- [ ] All fields validate properly
- [ ] Submit button works
- [ ] Loading state shows during submission
- [ ] Success message appears
- [ ] Admin email received
- [ ] Customer confirmation received
- [ ] Form resets after success
- [ ] Error messages display correctly
- [ ] Rate limiting works (try 6 submissions)

---

## 📱 Test on Mobile

1. Get your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Visit from phone: `http://YOUR_IP:3000/#contact`
3. Test form submission
4. Verify responsive design

---

## 🚀 Production Deployment

Before deploying:

1. ✅ Verify domain in Resend
2. ✅ Add DNS records (SPF, DKIM, DMARC)
3. ✅ Set up CAPTCHA with production domain
4. ✅ Update environment variables in hosting platform
5. ✅ Test email delivery in production
6. ✅ Monitor for errors

---

## 💡 Tips

**Free Tier Limits:**
- **Resend:** 3,000 emails/month free
- **Cloudflare Turnstile:** 1 million requests/month free

**Best Practices:**
- Enable CAPTCHA in production
- Monitor email delivery rates
- Set up error tracking
- Keep API keys secret
- Use different keys for dev/production

---

## 📖 Full Documentation

See `PHASE-4-IMPLEMENTATION-SUMMARY.md` for complete technical documentation.

---

**Need Help?**
- Resend Docs: https://resend.com/docs
- Turnstile Docs: https://developers.cloudflare.com/turnstile/

Happy coding! 🎉
