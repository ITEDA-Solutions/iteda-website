# 🚀 Complete Startup Guide - Frontend + CMS

## ✅ What Was Fixed

### Problem
Multiple frontend servers were running on different ports (3000, 3004, 3005), causing:
- Port conflicts (servers moving to next available port)
- CORS errors (CMS not allowing the new ports)
- Connection failures

### Solution
1. ✅ Killed all old frontend servers
2. ✅ Fixed `payload-api.ts` to use correct CMS port (3001)
3. ✅ Updated CMS CORS to allow localhost:3000
4. ✅ Cleaned up duplicate processes

---

## 🎯 How to Start the System (Fresh Start)

### Step 1: Start CMS Backend

```bash
cd c:\Apache24\htdocs\iteda-website\cms\cms-poc
npm run dev
```

**Wait for:**
```
✓ Ready in X.Xs
▲ Next.js 15.4.4
- Local: http://localhost:3001
```

**CMS is now running on:** `http://localhost:3001`

---

### Step 2: Start Frontend

**In a NEW terminal window:**

```bash
cd c:\Apache24\htdocs\iteda-website
npm run dev
```

**Wait for:**
```
✓ Ready in X.Xs
- Local: http://localhost:3000
```

**Frontend is now running on:** `http://localhost:3000`

---

### Step 3: Access the System

| Service | URL | Purpose |
|---------|-----|---------|
| **Website** | http://localhost:3000 | Your public-facing website |
| **CMS Admin** | http://localhost:3001/admin | Content management |
| **CMS API** | http://localhost:3001/api | Data endpoint |

---

## 🔍 Verify Everything is Working

### Check 1: CMS API

Open in browser: `http://localhost:3001/api/globals/about`

**Expected:** JSON with your Mission and Vision content

### Check 2: Frontend

Open: `http://localhost:3000`

Scroll to "Our Mission" and "Our Vision"

**Expected:** Your actual content from CMS (not fallback text)

### Check 3: No Console Errors

1. Press `F12` on the frontend
2. Go to Console tab
3. **Expected:** No CORS errors, no "fetch failed" messages

---

## ⚠️ Important Rules

### DO NOT:
- ❌ Run `npm run dev` multiple times in the same directory
- ❌ Leave old servers running when restarting
- ❌ Change ports manually

### DO:
- ✅ Always stop the server (`Ctrl+C`) before restarting
- ✅ Check if port is free before starting
- ✅ Close all old terminals before starting fresh

---

## 🛑 If Port is Already in Use

### Option 1: Kill the Process (Recommended)

```powershell
# Find what's using the port
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /F /PID <PID>
```

### Option 2: Close All Node Processes

```powershell
# WARNING: This kills ALL Node.js processes
taskkill /F /IM node.exe
```

Then restart both servers fresh.

---

## 🔧 If Connection Still Fails

### Check 1: Verify Ports

```powershell
# Should show both 3000 (frontend) and 3001 (CMS)
netstat -ano | findstr :300
```

### Check 2: Test CMS API Directly

```powershell
curl http://localhost:3001/api/globals/about
```

Should return JSON with your content.

### Check 3: Browser Hard Refresh

On the frontend (`localhost:3000`):
- Press `Ctrl + Shift + R` (Windows)
- Or `Ctrl + F5`

This clears cache and forces a fresh fetch.

---

## 📋 Current Configuration

### Frontend (Next.js)
- **Port:** 3000
- **Connects to CMS at:** localhost:3001
- **File:** `src/lib/payload-api.ts`

### CMS (Payload)
- **Port:** 3001
- **Allows requests from:** localhost:3000, localhost:3001
- **File:** `cms/cms-poc/src/payload.config.ts`

### Database
- **Type:** PostgreSQL (local)
- **Host:** localhost:5432
- **Database:** iteda_cms
- **User:** postgres
- **Password:** Zawadi

---

## 🎯 Quick Recovery Script

If you ever get confused with multiple servers, run this:

```powershell
# Stop all Node.js processes
taskkill /F /IM node.exe

# Wait 5 seconds
Start-Sleep -Seconds 5

# Start CMS (in first terminal)
cd c:\Apache24\htdocs\iteda-website\cms\cms-poc
npm run dev

# Start Frontend (in second terminal)
cd c:\Apache24\htdocs\iteda-website
npm run dev
```

---

## ✅ Success Checklist

After starting both servers, verify:

- [ ] CMS running on port 3001
- [ ] Frontend running on port 3000 (NOT 3004, 3005, etc.)
- [ ] No CORS errors in browser console
- [ ] Mission and Vision showing actual content (not fallback)
- [ ] Products displaying from CMS

---

## 📞 Still Having Issues?

### Check Browser Console

1. Open frontend: `http://localhost:3000`
2. Press `F12`
3. Go to Console tab
4. Look for errors (red text)

**Common errors:**
- **Failed to fetch** → CMS not running
- **CORS policy** → CMS needs restart or wrong port
- **Connection refused** → Wrong port number

---

**Last Updated:** 2025-11-24  
**All old servers cleared:** ✅  
**Configuration fixed:** ✅  
**Ready to use:** ✅
