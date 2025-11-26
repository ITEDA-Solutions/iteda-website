# 🔐 Reset CMS Admin Credentials - Complete Guide

## Problem
You don't remember your login credentials for the Payload CMS admin panel at `http://localhost:3001/admin`.

---

## ✅ **EASIEST SOLUTION: Create New Admin User**

### Method 1: Using Browser Console (Recommended)

Since the CMS doesn't have a "Forgot Password" feature enabled yet, we'll create a new admin user directly via the API.

#### Step 1: Open Browser Developer Console
1. Open your browser
2. Go to: `http://localhost:3001/admin`
3. Press `F12` to open Developer Tools
4. Click on **Console** tab

#### Step 2: Run This Script in Console

Copy and paste this code into the console:

```javascript
// Create new admin user via API
async function createNewAdmin() {
  const email = prompt("Enter new admin email:");
  const password = prompt("Enter new admin password (min 8 characters):");
  
  if (!email || !password) {
    console.log("❌ Email and password required!");
    return;
  }
  
  if (password.length < 8) {
    console.log("❌ Password must be at least 8 characters!");
    return;
  }
  
  try {
    const response = await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("✅ Admin user created successfully!");
      console.log("📧 Email:", email);
      console.log("🔐 Password:", password);
      console.log("🔗 Login at: http://localhost:3001/admin");
      console.log("\n💾 SAVE THESE CREDENTIALS!");
    } else {
      const error = await response.json();
      console.error("❌ Error:", error);
    }
  } catch (error) {
    console.error("❌ Failed:", error.message);
  }
}

// Run the function
createNewAdmin();
```

#### Step 3: Enter Credentials
- When prompted, enter:
  - **Email**: Your desired admin email (e.g., `admin@itedasolutions.com`)
  - **Password**: Your desired password (minimum 8 characters)

#### Step 4: Login
- Refresh the page
- Login with your new credentials!

---

## Method 2: Using PowerShell/Terminal

Open a **NEW** PowerShell terminal (not where the server is running) and run:

```powershell
# Navigate to project root
cd c:\Apache24\htdocs\iteda-website

# Create admin via curl
$body = @{
    email = "admin@itedasolutions.com"
    password = "YourSecurePassword123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/users" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
```

**Make sure to change**:
- `admin@itedasolutions.com` → Your desired email
- `YourSecurePassword123` → Your desired password (min 8 characters)

---

## Method 3: Using Node.js Script

I've created a script for you. Run these commands:

```bash
# Navigate to CMS directory
cd c:\Apache24\htdocs\iteda-website\cms\cms-poc

# Run the admin creator (requires CMS to be running)
node create-new-admin.js
```

Follow the prompts to create a new admin user.

---

## Method 4: Direct Database Access (Advanced)

If none of the above work, you can access your Supabase database directly:

1. Go to your Supabase dashboard: https://supabase.com
2. Open **SQL Editor**
3. Run this query to see existing users:

```sql
SELECT id, email, created_at FROM users;
```

4. To create a new user (password will need to be hashed manually - not recommended)

---

## ⚠️ **IMPORTANT: Save Your New Credentials!**

Once you create a new admin user, **WRITE DOWN** the credentials:

```
📧 Email: _______________________
🔐 Password: ____________________
🔗 URL: http://localhost:3001/admin
```

Store them in a password manager or secure location!

---

## 🧪 Test Your New Credentials

After creating the admin user:

1. Open: `http://localhost:3001/admin`
2. Enter your new email and password
3. Click **Login**
4. You should now have access! 🎉

---

## 🔍 Troubleshooting

### "User already exists" Error

If you get this error:
- Try a different email address
- Or use Method 4 to check existing users in the database

### "Cannot connect to CMS" Error

Make sure the CMS is running:
```bash
cd c:\Apache24\htdocs\iteda-website\cms\cms-poc
npm run dev
```

Check it's running at: `http://localhost:3001`

### "Unauthorized" or "Access Denied"

The Users collection might have restricted access. Check:
- `cms/cms-poc/src/collections/Users.ts`
- Make sure `create: () => true` is set (for development)

---

## 🎯 Quick Reference

**CMS is running at**: `http://localhost:3001`  
**Admin panel**: `http://localhost:3001/admin`  
**API endpoint**: `http://localhost:3001/api/users`  

**Default admin credentials** (if you created earlier):
- Check any notes you made when first setting up
- Check the terminal output from when you ran `create-admin-user.js`

---

## 💡 Pro Tip: Enable "Forgot Password" Feature

To avoid this in the future, you can enable password reset functionality in Payload CMS. This requires:
1. Email service configuration (Resend is already set up)
2. Enabling the forgot password flow in Users collection
3. Adding a reset password route

Would you like me to set this up for you after you regain access?

---

**Last Updated**: 2025-11-24  
**Created by**: Antigravity AI Assistant
