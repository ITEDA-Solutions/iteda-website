# 🚀 Production Deployment Guide - Frontend + CMS Connection

## 📊 Current Status

**Frontend**: ✅ Deployed on Vercel  
**URL**: https://vercel.com/iteda-solutions/iteda-website/8A5sFihz36KkVzh8T85Yp9AuUBtm  
**CMS**: ❌ Not deployed yet (running locally on localhost:3001)

**Problem**: Frontend can't connect to CMS because CMS is only on your local machine!

---

## 🎯 Solution: Deploy CMS to Production

You have **two options**:

---

## ✅ **OPTION 1: Deploy CMS to Vercel** (Recommended)

### Why This Is Best:
- ✅ Same platform as frontend
- ✅ Easy environment variable sharing
- ✅ Free for hobby projects
- ✅ Automatic HTTPS
- ✅ Fast deployment
- ✅ Built-in PostgreSQL support (Vercel Postgres)

### Step-by-Step Guide:

#### **Step 1: Prepare CMS for Deployment**

1. **Create a separate Vercel project for CMS**:
   ```bash
   cd cms/cms-poc
   ```

2. **Create `vercel.json` in CMS directory** (already exists):
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "framework": "nextjs",
     "installCommand": "npm install"
   }
   ```

#### **Step 2: Set Up Database (Vercel Postgres)**

**Option A: Use Vercel Postgres** (Recommended)

1. Go to Vercel Dashboard
2. Create new project for CMS
3. Go to **Storage** tab
4. Click **Create Database** → **Postgres**
5. Copy the `DATABASE_URL` connection string

**Option B: Use Supabase** (Your current setup)

1. Keep using your existing Supabase database
2. Use the connection string from Supabase

#### **Step 3: Deploy CMS to Vercel**

**Method 1: Using Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to CMS directory
cd cms/cms-poc

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Method 2: Using GitHub**

1. Push CMS code to GitHub (separate repo or monorepo)
2. Go to Vercel Dashboard
3. Click **Add New Project**
4. Import your CMS repository
5. Set root directory to `cms/cms-poc`
6. Deploy

#### **Step 4: Configure CMS Environment Variables**

In Vercel Dashboard (CMS project):

```env
# Database
DATABASE_URI=postgresql://user:password@host:5432/database

# Payload CMS
PAYLOAD_SECRET=your-super-secret-key-min-32-chars

# CMS URL (will be provided by Vercel)
NEXT_PUBLIC_PAYLOAD_URL=https://your-cms.vercel.app

# CORS (add your frontend URL)
VERCEL_URL=your-cms.vercel.app
```

#### **Step 5: Update Frontend Environment Variables**

In Vercel Dashboard (Frontend project):

```env
# Point to your deployed CMS
NEXT_PUBLIC_PAYLOAD_URL=https://your-cms.vercel.app

# Email (if using)
RESEND_API_KEY=re_xxxxxxxxxxxxx
COMPANY_EMAIL=info@itedasolutions.com
FROM_EMAIL=noreply@itedasolutions.com
```

#### **Step 6: Update CMS CORS Configuration**

**Edit**: `cms/cms-poc/src/payload.config.ts`

```typescript
cors: [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://iteda-website.vercel.app', // Your frontend URL
  'https://your-cms.vercel.app', // Your CMS URL
  process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001',
  ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
],
csrf: [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://iteda-website.vercel.app',
  'https://your-cms.vercel.app',
  process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001',
  ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
],
```

#### **Step 7: Redeploy Both Projects**

```bash
# Redeploy CMS
cd cms/cms-poc
vercel --prod

# Redeploy Frontend
cd ../..
vercel --prod
```

#### **Step 8: Test the Connection**

1. Open your frontend: `https://iteda-website.vercel.app`
2. Check if Mission/Vision content loads
3. Open CMS admin: `https://your-cms.vercel.app/admin`
4. Update content and verify it appears on frontend

---

## ✅ **OPTION 2: Deploy CMS to Railway/Render**

### Why Choose This:
- ✅ Better for long-running processes
- ✅ More control over server
- ✅ Easier database management
- ✅ Free tier available

### Step-by-Step Guide (Railway):

#### **Step 1: Create Railway Account**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project

#### **Step 2: Deploy PostgreSQL**

1. Click **New** → **Database** → **PostgreSQL**
2. Copy the connection string
3. Save for later

#### **Step 3: Deploy CMS**

1. Click **New** → **GitHub Repo**
2. Select your repository
3. Set root directory: `cms/cms-poc`
4. Railway auto-detects Next.js

#### **Step 4: Configure Environment Variables**

In Railway dashboard:

```env
DATABASE_URI=postgresql://...from-railway...
PAYLOAD_SECRET=your-super-secret-key
NEXT_PUBLIC_PAYLOAD_URL=https://your-cms.up.railway.app
PORT=3001
```

#### **Step 5: Update Frontend on Vercel**

In Vercel Dashboard (Frontend):

```env
NEXT_PUBLIC_PAYLOAD_URL=https://your-cms.up.railway.app
```

#### **Step 6: Update CORS**

Same as Option 1, but use Railway URL:
```typescript
cors: [
  'https://iteda-website.vercel.app',
  'https://your-cms.up.railway.app',
  // ...
],
```

---

## 🔧 **Quick Setup Script**

I'll create a script to help you deploy:

### For Vercel Deployment:

```bash
#!/bin/bash

# Deploy CMS to Vercel
echo "🚀 Deploying CMS to Vercel..."
cd cms/cms-poc
vercel --prod

# Get CMS URL
echo "📝 Copy your CMS URL from Vercel output"
read -p "Enter CMS URL (e.g., https://your-cms.vercel.app): " CMS_URL

# Update frontend environment variable
echo "🔧 Updating frontend environment variable..."
cd ../..
vercel env add NEXT_PUBLIC_PAYLOAD_URL production
# Paste the CMS URL when prompted

# Redeploy frontend
echo "🚀 Redeploying frontend..."
vercel --prod

echo "✅ Deployment complete!"
echo "Frontend: https://iteda-website.vercel.app"
echo "CMS Admin: $CMS_URL/admin"
```

---

## 📋 **Deployment Checklist**

### Pre-Deployment:
- [ ] Database ready (Vercel Postgres or Supabase)
- [ ] Environment variables prepared
- [ ] CORS configuration updated
- [ ] Code pushed to GitHub

### CMS Deployment:
- [ ] CMS deployed to Vercel/Railway
- [ ] Database connected
- [ ] Environment variables set
- [ ] Admin panel accessible
- [ ] Test login works

### Frontend Deployment:
- [ ] Frontend environment variable updated
- [ ] CORS allows frontend domain
- [ ] Frontend redeployed
- [ ] Test CMS connection

### Testing:
- [ ] Frontend loads without errors
- [ ] Mission/Vision content displays
- [ ] Products load from CMS
- [ ] Admin panel accessible
- [ ] Can update content in CMS
- [ ] Changes reflect on frontend

---

## 🔍 **Troubleshooting**

### Frontend Shows Fallback Content

**Problem**: "Mission content will be available when CMS is connected"

**Solutions**:
1. ✅ Check `NEXT_PUBLIC_PAYLOAD_URL` is set correctly
2. ✅ Verify CMS is accessible at that URL
3. ✅ Check CORS configuration
4. ✅ Redeploy frontend after env var change

### CORS Errors

**Problem**: "blocked by CORS policy"

**Solutions**:
1. ✅ Add frontend URL to CMS CORS config
2. ✅ Add CMS URL to CORS config
3. ✅ Redeploy CMS after changes
4. ✅ Check both `cors` and `csrf` arrays

### CMS Won't Start

**Problem**: Build fails or crashes

**Solutions**:
1. ✅ Check `DATABASE_URI` is correct
2. ✅ Verify `PAYLOAD_SECRET` is set (min 32 chars)
3. ✅ Check build logs in Vercel/Railway
4. ✅ Ensure all dependencies installed

### Database Connection Failed

**Problem**: "Failed to connect to database"

**Solutions**:
1. ✅ Verify connection string format
2. ✅ Check database is running
3. ✅ Whitelist Vercel/Railway IPs in database
4. ✅ Test connection string locally first

---

## 💰 **Cost Breakdown**

### Option 1: Vercel + Vercel Postgres
- **Frontend**: Free (Hobby plan)
- **CMS**: Free (Hobby plan)
- **Database**: $0.25/GB stored, $0.25/GB transferred
- **Total**: ~$5-10/month for small site

### Option 2: Vercel + Railway
- **Frontend**: Free (Vercel Hobby)
- **CMS**: $5/month (Railway)
- **Database**: Included with Railway
- **Total**: $5/month

### Option 3: Vercel + Supabase
- **Frontend**: Free (Vercel Hobby)
- **CMS**: Free (Vercel Hobby)
- **Database**: Free (Supabase free tier)
- **Total**: $0/month! 🎉

**Recommendation**: Use **Vercel + Supabase** (Option 3) for free hosting!

---

## 🎯 **Recommended Setup**

For your project, I recommend:

1. **Frontend**: Vercel (already done ✅)
2. **CMS**: Vercel (new project)
3. **Database**: Supabase (free tier)

**Why?**
- ✅ Completely free
- ✅ Easy to manage
- ✅ Fast deployment
- ✅ Automatic HTTPS
- ✅ Great developer experience

---

## 📝 **Environment Variables Summary**

### Frontend (Vercel):
```env
NEXT_PUBLIC_PAYLOAD_URL=https://your-cms.vercel.app
RESEND_API_KEY=re_xxxxxxxxxxxxx
COMPANY_EMAIL=info@itedasolutions.com
FROM_EMAIL=noreply@itedasolutions.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...
TURNSTILE_SECRET_KEY=0x4AAAAAAA...
```

### CMS (Vercel):
```env
DATABASE_URI=postgresql://...supabase...
PAYLOAD_SECRET=your-super-secret-key-minimum-32-characters
NEXT_PUBLIC_PAYLOAD_URL=https://your-cms.vercel.app
```

---

## 🚀 **Quick Start Commands**

```bash
# 1. Deploy CMS
cd cms/cms-poc
vercel --prod

# 2. Note the CMS URL from output

# 3. Add env var to frontend
cd ../..
vercel env add NEXT_PUBLIC_PAYLOAD_URL production
# Enter the CMS URL

# 4. Redeploy frontend
vercel --prod

# 5. Test
# Open: https://iteda-website.vercel.app
# Check if content loads from CMS
```

---

## ✅ **Success Criteria**

Your deployment is successful when:

1. ✅ Frontend loads without errors
2. ✅ Mission and Vision show actual content (not fallback)
3. ✅ Products display from CMS
4. ✅ CMS admin panel is accessible
5. ✅ You can login to CMS
6. ✅ Content updates in CMS appear on frontend
7. ✅ No CORS errors in browser console

---

## 📞 **Need Help?**

If you encounter issues:

1. **Check Vercel Logs**: Vercel Dashboard → Deployments → Logs
2. **Check Browser Console**: F12 → Console tab
3. **Test CMS API**: Visit `https://your-cms.vercel.app/api/globals/about`
4. **Verify Environment Variables**: Vercel Dashboard → Settings → Environment Variables

---

**Ready to deploy?** Let me know which option you prefer and I can help you through the process! 🚀
