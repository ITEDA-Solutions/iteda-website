# Payload CMS Access Guide

## 🚀 How to Access Payload CMS

This guide will help you access and use your Payload CMS admin interface to manage content for your website.

## 📋 Prerequisites

Before accessing Payload CMS, ensure:
- ✅ Supabase database is connected (now updated with your credentials)
- ✅ CMS server is running
- ✅ Admin user account is created

## 🔧 Step 1: Start the CMS Server

### Option A: Quick Start Script
```bash
# Run the automated start script
node start-cms-backend.js
```

### Option B: Manual Start
```bash
# Navigate to CMS directory
cd cms/cms-poc

# Start the CMS server
npm run dev
```

The CMS will start on: **http://localhost:3001**

## 🔐 Step 2: Create Admin User (First Time Only)

If you haven't created an admin user yet, run:

```bash
# Create your first admin user
node create-admin-user.js
```

This will prompt you to enter:
- Email address
- Password
- Confirm password

## 🌐 Step 3: Access the Admin Interface

1. **Open your browser** and go to: **http://localhost:3001/admin**

2. **Login** with the credentials you created in Step 2

3. **You're in!** You should see the Payload CMS dashboard

## 📊 What You'll See in the Admin Interface

### Collections (Content Types)
- **📄 Homepage** - Manage homepage sections (hero, about, CTA)
- **🛍️ Products** - Add/edit products with images and descriptions
- **📸 Media** - Upload and manage images
- **👥 Users** - Manage admin users

### Globals (Site-wide Content)
- **📖 About** - Edit mission and vision statements
- **⚙️ Site Settings** - Update contact email and social media links

## ✏️ Creating and Editing Content

### Adding Homepage Sections
1. Go to **Collections → Homepage**
2. Click **Create New**
3. Choose section type: `hero`, `about`, or `cta`
4. Add your content using the rich text editor
5. Set the order number (lower numbers appear first)
6. Click **Save**

### Managing Products
1. Go to **Collections → Products**
2. Click **Create New**
3. Fill in:
   - **Name**: Product title
   - **Description**: Rich text description
   - **Image**: Upload or select from media library
   - **Link**: Optional external URL
4. Click **Save**

### Uploading Images
1. Go to **Collections → Media**
2. Click **Create New**
3. Drag and drop your image or click to browse
4. Add alt text for accessibility
5. Click **Save**

### Editing About Content
1. Go to **Globals → About**
2. Edit **Mission** and **Vision** using rich text editors
3. Click **Save**

### Updating Site Settings
1. Go to **Globals → Site Settings**
2. Update **Contact Email**
3. Add/edit **Social Links**:
   - Choose platform (Twitter, LinkedIn, etc.)
   - Enter profile URL
4. Click **Save**

## 🔄 Content Updates and Preview

### How Content Updates Work
1. **Edit in CMS** → Content is saved to Supabase database
2. **Frontend Fetches** → Website automatically gets new content
3. **Cache Refresh** → Changes appear within 60 seconds

### Viewing Changes
- **Frontend Website**: http://localhost:3000
- Changes appear automatically (may take up to 60 seconds due to caching)
- Force refresh browser (Ctrl+F5) to see immediate changes

## 🛠️ Troubleshooting

### Can't Access Admin Interface?

**Check if CMS server is running:**
```bash
# Test CMS connectivity
node check-cms-connection.js
```

**If server is not running:**
```bash
# Start CMS server
cd cms/cms-poc
npm run dev
```

### Forgot Admin Password?

**Reset admin access:**
```bash
# Reset and create new admin user
node reset-admin-access.js
```

### Database Connection Issues?

**Check database connection:**
```bash
# Verify Supabase connection
cd cms/cms-poc
node verify-setup.js
```

### Content Not Appearing on Website?

1. **Check frontend server** is running at http://localhost:3000
2. **Wait 60 seconds** for cache to refresh
3. **Hard refresh browser** (Ctrl+F5)
4. **Check browser console** for any errors

## 📱 Mobile Access

The Payload admin interface is responsive and works on:
- ✅ Desktop browsers
- ✅ Tablet devices
- ✅ Mobile phones

## 🔐 Security Notes

### Admin Access
- Only users with admin accounts can access the CMS
- Always use strong passwords
- Log out when finished editing

### Content Security
- All content is stored securely in Supabase
- Rich text content is sanitized to prevent security issues
- Image uploads are validated for file type and size

## 🚀 Quick Start Checklist

- [ ] 1. Start CMS server: `cd cms/cms-poc && npm run dev`
- [ ] 2. Create admin user: `node create-admin-user.js`
- [ ] 3. Access admin: http://localhost:3001/admin
- [ ] 4. Login with your credentials
- [ ] 5. Start creating content!

## 📞 Support

If you encounter issues:

1. **Check server status**: `node check-cms-connection.js`
2. **Verify database**: `cd cms/cms-poc && node verify-setup.js`
3. **Reset admin access**: `node reset-admin-access.js`
4. **Check logs**: Look at terminal output for error messages

## 🎯 Next Steps

Once you're logged in:

1. **Create your first homepage section**
2. **Add your mission and vision statements**
3. **Upload product images and information**
4. **Update site settings with your contact info**
5. **Preview changes on the frontend website**

Your Payload CMS is now connected to Supabase and ready for content management! 🎉