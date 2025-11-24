#!/usr/bin/env node

/**
 * Payload CMS Backend Management Guide
 * Complete guide for starting, stopping, and managing the CMS backend
 */

console.log('🔧 Payload CMS Backend Management Guide');
console.log('======================================\n');

console.log('📍 CMS Backend Location');
console.log('=======================\n');
console.log('Directory: cms/cms-poc/');
console.log('Configuration: cms/cms-poc/src/payload.config.ts');
console.log('Environment: cms/cms-poc/.env');
console.log('Package.json: cms/cms-poc/package.json');
console.log('');

console.log('🚀 How to Start the CMS Backend');
console.log('===============================\n');

console.log('Method 1: Manual Start (Recommended for development)');
console.log('----------------------------------------------------');
console.log('1. Open a terminal/command prompt');
console.log('2. Navigate to the CMS directory:');
console.log('   cd cms/cms-poc');
console.log('');
console.log('3. Install dependencies (first time only):');
console.log('   npm install');
console.log('');
console.log('4. Start the development server:');
console.log('   npm run dev');
console.log('');
console.log('5. The CMS will be available at:');
console.log('   • API: http://localhost:3001/api');
console.log('   • Admin: http://localhost:3001/admin');
console.log('');

console.log('Method 2: Background Process (Current setup)');
console.log('--------------------------------------------');
console.log('The CMS is currently running as a background process.');
console.log('You can manage it using the process management tools.');
console.log('');

console.log('Method 3: Production Start');
console.log('-------------------------');
console.log('For production deployment:');
console.log('1. cd cms/cms-poc');
console.log('2. npm run build');
console.log('3. npm start');
console.log('');

console.log('⚙️  CMS Backend Configuration');
console.log('=============================\n');

console.log('Environment Variables (.env file):');
console.log('----------------------------------');
console.log('DATABASE_URI=postgresql://... (Supabase connection)');
console.log('PAYLOAD_SECRET=... (32+ character secret key)');
console.log('NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001');
console.log('');

console.log('Key Configuration Files:');
console.log('------------------------');
console.log('• payload.config.ts - Main CMS configuration');
console.log('• collections/ - Content type definitions');
console.log('• globals/ - Global content definitions');
console.log('• package.json - Dependencies and scripts');
console.log('');

console.log('🗄️  Database Connection');
console.log('=======================\n');

console.log('The CMS connects to Supabase PostgreSQL:');
console.log('• Adapter: @payloadcms/db-postgres');
console.log('• Connection pooling enabled');
console.log('• SSL/TLS encryption');
console.log('• Automatic migrations');
console.log('');

console.log('📊 Available Scripts');
console.log('===================\n');

console.log('Development:');
console.log('• npm run dev - Start development server');
console.log('• npm run build - Build for production');
console.log('• npm start - Start production server');
console.log('• npm run generate:types - Generate TypeScript types');
console.log('• npm run generate:importmap - Generate import map');
console.log('');

console.log('Testing:');
console.log('• npm run test:int - Run integration tests');
console.log('• npm run test:e2e - Run E2E tests');
console.log('• npm run test - Run all tests');
console.log('');

console.log('🔍 Checking CMS Status');
console.log('======================\n');

async function checkCMSStatus() {
  try {
    console.log('Testing CMS connectivity...');
    
    // Test API health
    const apiResponse = await fetch('http://localhost:3001/api/homepage');
    if (apiResponse.ok) {
      console.log('✅ CMS API: Running and accessible');
    } else {
      console.log('❌ CMS API: Not responding properly');
    }
    
    // Test admin interface
    const adminResponse = await fetch('http://localhost:3001/admin');
    if (adminResponse.ok) {
      console.log('✅ Admin Interface: Accessible');
    } else {
      console.log('❌ Admin Interface: Not accessible');
    }
    
    console.log('');
    console.log('🌐 CMS Access URLs:');
    console.log('• Admin Interface: http://localhost:3001/admin');
    console.log('• API Base: http://localhost:3001/api');
    console.log('• Health Check: http://localhost:3001/api/homepage');
    
  } catch (error) {
    console.log('❌ CMS Backend: Not running');
    console.log('');
    console.log('🔧 To start the CMS backend:');
    console.log('1. Open terminal');
    console.log('2. cd cms/cms-poc');
    console.log('3. npm run dev');
  }
}

await checkCMSStatus();

console.log('');
console.log('🏗️  CMS Architecture');
console.log('===================\n');

console.log('Collections (Content Types):');
console.log('• Homepage - Dynamic homepage sections');
console.log('• Products - Product listings with images');
console.log('• Media - Image upload and management');
console.log('• Users - Admin user authentication');
console.log('');

console.log('Globals (Site-wide Content):');
console.log('• About - Mission and Vision statements');
console.log('• Site Settings - Contact info and social links');
console.log('');

console.log('🔐 Admin Authentication');
console.log('=======================\n');

console.log('First-time Setup:');
console.log('1. Visit http://localhost:3001/admin');
console.log('2. Create your first admin user');
console.log('3. Set up email and password');
console.log('4. Start creating content');
console.log('');

console.log('Subsequent Access:');
console.log('• Login with your admin credentials');
console.log('• Manage all content types');
console.log('• Upload and organize media');
console.log('• Configure site settings');
console.log('');

console.log('📝 Content Management Workflow');
console.log('==============================\n');

console.log('1. Homepage Sections:');
console.log('   • Go to Collections → Homepage');
console.log('   • Create sections (hero, about, cta)');
console.log('   • Use rich text editor for content');
console.log('   • Set order for section arrangement');
console.log('');

console.log('2. Mission & Vision:');
console.log('   • Go to Globals → About');
console.log('   • Edit Mission statement');
console.log('   • Edit Vision statement');
console.log('   • Use rich text formatting');
console.log('');

console.log('3. Products:');
console.log('   • Go to Collections → Products');
console.log('   • Add product name and description');
console.log('   • Upload product images');
console.log('   • Add external links if needed');
console.log('');

console.log('4. Site Settings:');
console.log('   • Go to Globals → Site Settings');
console.log('   • Update contact email');
console.log('   • Add social media links');
console.log('   • Configure site-wide settings');
console.log('');

console.log('🔄 Development Workflow');
console.log('=======================\n');

console.log('Daily Development:');
console.log('1. Start CMS: cd cms/cms-poc && npm run dev');
console.log('2. Start Frontend: npm run dev (in root directory)');
console.log('3. Access admin: http://localhost:3001/admin');
console.log('4. View website: http://localhost:3000');
console.log('5. Make content changes and see them live');
console.log('');

console.log('🚨 Troubleshooting');
console.log('==================\n');

console.log('Common Issues:');
console.log('');
console.log('CMS won\'t start:');
console.log('• Check .env file exists with correct DATABASE_URI');
console.log('• Verify Supabase database is accessible');
console.log('• Run: npm install in cms/cms-poc directory');
console.log('');

console.log('Port conflicts:');
console.log('• CMS runs on port 3001 by default');
console.log('• If port busy, Next.js will use next available port');
console.log('• Update NEXT_PUBLIC_PAYLOAD_URL in .env.local if needed');
console.log('');

console.log('Database connection issues:');
console.log('• Verify DATABASE_URI in cms/cms-poc/.env');
console.log('• Check Supabase project is active');
console.log('• Ensure database credentials are correct');
console.log('');

console.log('Admin access issues:');
console.log('• Clear browser cache and cookies');
console.log('• Try incognito/private browsing mode');
console.log('• Check browser console for JavaScript errors');
console.log('');

console.log('📚 Additional Resources');
console.log('======================\n');

console.log('Documentation Files:');
console.log('• cms/cms-poc/CONTENT-WORKFLOW-GUIDE.md');
console.log('• COMPLETE-CMS-IMPLEMENTATION-SUMMARY.md');
console.log('• cms/cms-poc/DATABASE-AUTH-SETUP.md');
console.log('');

console.log('Verification Scripts:');
console.log('• node cms/cms-poc/verify-setup.js');
console.log('• node test-cms-api-direct.js');
console.log('• node cms/cms-poc/verify-content-workflow.js');
console.log('');

console.log('🎯 Quick Start Commands');
console.log('=======================\n');

console.log('Start CMS Backend:');
console.log('cd cms/cms-poc && npm run dev');
console.log('');

console.log('Start Frontend:');
console.log('npm run dev');
console.log('');

console.log('Access Points:');
console.log('• Website: http://localhost:3000');
console.log('• CMS Admin: http://localhost:3001/admin');
console.log('• API: http://localhost:3001/api');
console.log('');

console.log('✨ Your Payload CMS backend is ready to use!');
console.log('Visit http://localhost:3001/admin to start managing content.');