#!/usr/bin/env node

/**
 * Setup Verification Script for Payload CMS
 * This script helps verify that the Payload CMS installation is configured correctly
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying Payload CMS Setup...\n');

// Check environment variables
console.log('📋 Environment Variables:');
console.log(`   DATABASE_URI: ${process.env.DATABASE_URI ? '✅ Set' : '❌ Missing'}`);
console.log(`   PAYLOAD_SECRET: ${process.env.PAYLOAD_SECRET ? '✅ Set' : '❌ Missing'}`);
console.log(`   NEXT_PUBLIC_PAYLOAD_URL: ${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'}`);

// Check if DATABASE_URI looks like a Supabase connection
if (process.env.DATABASE_URI) {
  const isSupabase = process.env.DATABASE_URI.includes('supabase.co');
  const hasPassword = !process.env.DATABASE_URI.includes('[YOUR_PASSWORD]');
  
  console.log(`   Database Type: ${isSupabase ? '✅ Supabase' : '⚠️  Not Supabase'}`);
  console.log(`   Password Set: ${hasPassword ? '✅ Yes' : '❌ No (still using placeholder)'}`);
}

// Check PAYLOAD_SECRET strength
if (process.env.PAYLOAD_SECRET) {
  const secretLength = process.env.PAYLOAD_SECRET.length;
  const isSecure = secretLength >= 32 && !process.env.PAYLOAD_SECRET.includes('your-secure');
  
  console.log(`   Secret Length: ${secretLength >= 32 ? '✅' : '❌'} ${secretLength} characters`);
  console.log(`   Secret Security: ${isSecure ? '✅ Secure' : '❌ Using placeholder'}`);
}

console.log('\n🚀 Next Steps:');
console.log('   1. Update your .env file with real Supabase credentials');
console.log('   2. Generate a secure PAYLOAD_SECRET (32+ characters)');
console.log('   3. Run: npm run dev');
console.log('   4. Visit: http://localhost:3000/admin');
console.log('   5. Create your first admin user');

console.log('\n📚 Documentation:');
console.log('   - Payload CMS: https://payloadcms.com/docs');
console.log('   - Supabase: https://supabase.com/docs');