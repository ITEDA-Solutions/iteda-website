# Frontend-CMS Connection Fix - Complete Guide

## ✅ What Was Fixed

### 1. **Corrected Default CMS URL**
- **File**: `src/lib/payload-api.ts` (Line 5)
- **Change**: Updated fallback URL from `http://localhost:3000` → `http://localhost:3001`
- **Why**: The frontend was trying to connect to the wrong port

### 2. **Environment Configuration Verified**
- **File**: `.env.local`
- **Status**: ✅ Already correctly set to `NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001`

---

## 🔧 Steps to Complete the Fix

### Step 1: Restart the Frontend Server ⚠️ **REQUIRED**

The code change won't take effect until you restart Next.js:

```bash
# In the terminal running the frontend (main directory)
# Press Ctrl+C to stop the server
# Then run:
npm run dev
```

**Location**: `c:\Apache24\htdocs\iteda-website`

---

### Step 2: Create Admin User (If Not Already Done)

You need an admin account to access the CMS:

```bash
cd c:\Apache24\htdocs\iteda-website
node create-admin-user.js
```

Follow the prompts to create:
- Email: (your choice, e.g., `admin@itedasolutions.com`)
- Password: (your choice, minimum 8 characters)

---

### Step 3: Login to CMS Admin Panel

1. Open browser: `http://localhost:3001/admin/login`
2. Enter your admin credentials
3. Click "Login"

---

### Step 4: Create About Content

Once logged in:

1. Click **"Globals"** in the left sidebar
2. Click **"About"**
3. Fill in:
   - **Mission**: Write your mission statement (use rich text formatting)
   - **Vision**: Write your vision statement
4. Click **"Save"** (top right)

**Sample Mission Content**:
```
At ITEDA Solutions, our mission is to revolutionize sustainable agriculture 
through innovative IoT technology. We empower farmers with smart, solar-powered 
solutions that reduce energy costs, minimize post-harvest losses, and contribute 
to a more sustainable food system.
```

**Sample Vision Content**:
```
We envision a future where every farmer has access to cutting-edge IoT solutions 
that enhance productivity, reduce waste, and ensure food security. Our goal is to 
be the leading provider of sustainable agricultural technology in East Africa and beyond.
```

---

### Step 5: Verify the Connection

1. Open frontend: `http://localhost:3000`
2. Scroll to "Our Mission" and "Our Vision" sections
3. **Expected Result**: You should see the content you just created in the CMS!

---

## 🧪 Test the API Connection

You can verify the CMS is accessible by testing these endpoints:

```bash
# Test Products (should return existing products)
powershell -Command "Invoke-WebRequest -Uri 'http://localhost:3001/api/products' -UseBasicParsing | Select-Object -ExpandProperty Content"

# Test About content (should return your mission/vision after you create it)
powershell -Command "Invoke-WebRequest -Uri 'http://localhost:3001/api/globals/about' -UseBasicParsing | Select-Object -ExpandProperty Content"
```

---

## 📍 Current Status

| Component | Status | Port | Notes |
|-----------|--------|------|-------|
| **Frontend (Next.js)** | ✅ Running | 3000 | Needs restart to apply fix |
| **CMS Backend (Payload)** | ✅ Running | 3001 | Working correctly |
| **Database (Supabase)** | ✅ Connected | - | Has products data |
| **About Content** | ❌ Empty | - | Needs to be created in admin |

---

## 🔍 Why Was the Connection Failing?

1. **Wrong Default Port**: The `payload-api.ts` file had a fallback to port 3000 (frontend) instead of 3001 (CMS)
2. **Empty Content**: The About global was empty `{}`, causing the frontend to show fallback text
3. **Server Restart Required**: Next.js loads environment variables and code at startup

---

## ⚡ Quick Fix Summary

```bash
# 1. Go to frontend directory
cd c:\Apache24\htdocs\iteda-website

# 2. Restart frontend (Ctrl+C first, then):
npm run dev

# 3. Create admin user (if needed)
node create-admin-user.js

# 4. Access CMS admin
# Open: http://localhost:3001/admin
# Create About content

# 5. View frontend
# Open: http://localhost:3000
# Mission and Vision should now display!
```

---

## 🚨 Troubleshooting

### Frontend Still Shows Fallback Text?

**Check browser console** (F12):
- Look for errors related to fetching from `localhost:3001`
- If you see CORS errors, the CMS needs to allow the frontend domain

**Clear browser cache**:
- Hard refresh: `Ctrl+Shift+R`

**Verify environment variable**:
```bash
# In PowerShell (frontend directory)
Get-Content .env.local
# Should show: NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
```

### CMS Admin Won't Load?

**Check if CMS is running**:
```bash
powershell -Command "Test-NetConnection -ComputerName localhost -Port 3001"
```

**Restart CMS**:
```bash
cd c:\Apache24\htdocs\iteda-website\cms\cms-poc
npm run dev
```

---

## 📦 What's Next?

After fixing the connection:

1. ✅ Create About content (Mission/Vision)
2. ✅ Add more products if needed
3. ✅ Configure Site Settings (Globals → Site Settings)
4. ✅ Upload product images via Media collection
5. ✅ Create homepage sections for dynamic content

---

## 📞 Need Help?

If the connection still doesn't work after following these steps:

1. Check if both servers are running (`npm run dev` in both directories)
2. Verify the ports (3000 for frontend, 3001 for CMS)
3. Clear browser cache completely
4. Check terminal output for any error messages

---

**Last Updated**: 2025-11-23
**Fixed by**: Code change in `src/lib/payload-api.ts` line 5
