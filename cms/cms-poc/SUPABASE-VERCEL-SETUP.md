# Supabase + Vercel Deployment Guide

This guide will help you deploy your Payload CMS to Vercel with Supabase as the database.

## Prerequisites

- [Supabase account](https://supabase.com)
- [Vercel account](https://vercel.com)
- [Vercel CLI](https://vercel.com/cli) installed globally: `npm install -g vercel`

## Step 1: Set up Supabase Database

1. **Create a new Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose your organization and set project details
   - Wait for the project to be created

2. **Get your database connection string**
   - Go to Project Settings > Database
   - Find the "Connection string" section
   - Copy the PostgreSQL connection string
   - It should look like: `postgresql://postgres:[YOUR_PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres`

3. **Update your local .env file**
   ```bash
   DATABASE_URI=postgresql://postgres:[YOUR_PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
   PAYLOAD_SECRET=your_32_character_secret_key_here
   NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
   ```

## Step 2: Test Local Connection

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run Supabase setup**
   ```bash
   npm run setup:supabase
   ```

3. **Run database migrations**
   ```bash
   npm run migrate
   ```

4. **Test locally**
   ```bash
   npm run dev
   ```

## Step 3: Deploy to Vercel

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy the project**
   ```bash
   npm run deploy:vercel
   ```
   
   Or manually:
   ```bash
   vercel
   vercel --prod
   ```

## Step 4: Configure Vercel Environment Variables

In your Vercel dashboard, go to your project settings and add these environment variables:

### Required Variables
- `DATABASE_URI`: Your Supabase PostgreSQL connection string
- `PAYLOAD_SECRET`: A secure 32+ character secret key
- `NEXT_PUBLIC_PAYLOAD_URL`: Your Vercel domain (e.g., `https://your-app.vercel.app`)

### Optional Variables (for direct Supabase client usage)
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Step 5: Run Production Migrations

After deployment, you need to run migrations in production:

1. **Using Vercel CLI**
   ```bash
   vercel env pull .env.production
   NODE_ENV=production npm run migrate
   ```

2. **Or create a migration endpoint** (recommended for production)
   - Create an API endpoint that runs migrations
   - Secure it with authentication
   - Call it once after deployment

## Step 6: Create Admin User

1. Visit your deployed site: `https://your-app.vercel.app/admin`
2. Create your first admin user
3. Test the CMS functionality

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify your DATABASE_URI is correct
   - Check Supabase project is active
   - Ensure password doesn't contain special characters that need URL encoding

2. **Build Errors on Vercel**
   - Check that all environment variables are set
   - Verify Node.js version compatibility
   - Check build logs for specific errors

3. **Media Upload Issues**
   - Ensure media directory exists and is writable
   - Check file size limits
   - Verify Sharp is properly installed

### Environment Variable Format

```bash
# Supabase Database
DATABASE_URI=postgresql://postgres:password@db.project-ref.supabase.co:5432/postgres

# Payload CMS
PAYLOAD_SECRET=your-32-character-secret-key-here

# URLs
NEXT_PUBLIC_PAYLOAD_URL=https://your-app.vercel.app

# Supabase Client (optional)
NEXT_PUBLIC_SUPABASE_URL=https://project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Security Considerations

1. **Use strong passwords** for your Supabase database
2. **Generate secure secrets** for PAYLOAD_SECRET
3. **Enable Row Level Security** in Supabase if needed
4. **Use environment variables** for all sensitive data
5. **Regularly update dependencies**

## Performance Optimization

1. **Enable caching** in Vercel
2. **Optimize images** with Sharp
3. **Use CDN** for media files
4. **Monitor database performance** in Supabase

## Monitoring and Maintenance

1. **Monitor Vercel deployments**
2. **Check Supabase database metrics**
3. **Set up error tracking** (e.g., Sentry)
4. **Regular backups** of your database
5. **Keep dependencies updated**

## Support

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)