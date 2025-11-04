#!/usr/bin/env node

/**
 * Database Setup and Configuration Verification Script for Payload CMS
 * This script verifies database configuration and provides setup guidance
 */

import dotenv from 'dotenv';
import { Client } from 'pg';

// Load environment variables
dotenv.config();

console.log('🔧 Verifying Database Configuration for Payload CMS...\n');

function validateEnvironmentVariables() {
  console.log('📋 Environment Variables Check:');
  
  const databaseUri = process.env.DATABASE_URI;
  const payloadSecret = process.env.PAYLOAD_SECRET;
  const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL;
  
  // Check DATABASE_URI
  if (!databaseUri) {
    console.log('   ❌ DATABASE_URI: Missing');
    return false;
  }
  
  console.log('   ✅ DATABASE_URI: Set');
  
  // Validate DATABASE_URI format
  const isSupabase = databaseUri.includes('supabase.co');
  const hasValidFormat = databaseUri.startsWith('postgresql://');
  const hasPlaceholder = databaseUri.includes('[YOUR_PASSWORD]') || databaseUri.includes('[YOUR_PROJECT_REF]');
  
  console.log(`   📍 Database Type: ${isSupabase ? 'Supabase' : 'PostgreSQL'}`);
  console.log(`   📍 Format Valid: ${hasValidFormat ? '✅ Yes' : '❌ No'}`);
  console.log(`   📍 Credentials: ${hasPlaceholder ? '❌ Using placeholders' : '✅ Configured'}`);
  
  // Check PAYLOAD_SECRET
  if (!payloadSecret) {
    console.log('   ❌ PAYLOAD_SECRET: Missing');
    return false;
  }
  
  const secretLength = payloadSecret.length;
  const isSecureSecret = secretLength >= 32 && !payloadSecret.includes('your-secure');
  
  console.log(`   ✅ PAYLOAD_SECRET: Set (${secretLength} characters)`);
  console.log(`   📍 Secret Security: ${isSecureSecret ? '✅ Secure' : '❌ Using placeholder'}`);
  
  // Check PAYLOAD_URL
  console.log(`   ✅ NEXT_PUBLIC_PAYLOAD_URL: ${payloadUrl || 'http://localhost:3000 (default)'}`);
  
  return hasValidFormat && !hasPlaceholder && isSecureSecret;
}

async function testDatabaseConnection() {
  const connectionString = process.env.DATABASE_URI;
  
  console.log('\n📡 Database Connection Test:');
  console.log(`   Connection: ${connectionString.replace(/:[^:@]*@/, ':***@')}`);

  try {
    const client = new Client({
      connectionString: connectionString,
      // Add connection timeout for faster failure detection
      connectionTimeoutMillis: 5000,
    });

    await client.connect();
    console.log('   ✅ Connection: Successful');

    // Test basic query
    const result = await client.query('SELECT version()');
    console.log('   ✅ Query Test: Successful');
    console.log(`   📍 PostgreSQL: ${result.rows[0].version.split(' ')[0]} ${result.rows[0].version.split(' ')[1]}`);

    // Check if payload tables exist
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND (table_name LIKE 'payload_%' OR table_name = 'users' OR table_name = 'media')
      ORDER BY table_name
    `);

    if (tablesResult.rows.length > 0) {
      console.log('   ✅ Payload Tables Found:');
      tablesResult.rows.forEach(row => {
        console.log(`      - ${row.table_name}`);
      });
    } else {
      console.log('   ℹ️  Payload Tables: None (expected for first run)');
    }

    await client.end();
    return true;
  } catch (error) {
    console.log('   ❌ Connection: Failed');
    console.log(`   📍 Error: ${error.message}`);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('   💡 Database server not reachable');
    } else if (error.code === 'ENOTFOUND') {
      console.log('   💡 Database host not found - check connection string');
    } else if (error.message.includes('password authentication failed')) {
      console.log('   💡 Authentication failed - check credentials');
    }
    
    return false;
  }
}

function printSetupInstructions(configValid, connectionSuccessful) {
  console.log('\n🚀 Setup Status & Next Steps:');
  
  if (!configValid) {
    console.log('   ❌ Configuration incomplete');
    console.log('\n📝 Required Actions:');
    console.log('   1. Update DATABASE_URI with real Supabase credentials');
    console.log('   2. Replace PAYLOAD_SECRET with secure 32+ character string');
    console.log('   3. Run this script again to verify');
    return;
  }
  
  if (!connectionSuccessful) {
    console.log('   ⚠️  Configuration valid but database unreachable');
    console.log('\n📝 Possible Issues:');
    console.log('   1. Database server not running');
    console.log('   2. Network connectivity issues');
    console.log('   3. Incorrect credentials or connection string');
    console.log('   4. Firewall blocking connection');
    return;
  }
  
  console.log('   ✅ Configuration and connection verified');
  console.log('\n📝 Ready to proceed:');
  console.log('   1. Run: npm run dev');
  console.log('   2. Visit: http://localhost:3000/admin');
  console.log('   3. Create your first admin user account');
  console.log('   4. Begin content management');
}

function printDocumentation() {
  console.log('\n📚 Documentation & Resources:');
  console.log('   - Payload CMS: https://payloadcms.com/docs');
  console.log('   - Supabase Setup: https://supabase.com/docs/guides/database');
  console.log('   - PostgreSQL Adapter: https://payloadcms.com/docs/database/postgres');
}

async function main() {
  console.log('Requirements: 1.2, 7.1, 7.2, 7.3, 8.1, 8.2, 8.3\n');
  
  // Step 1: Validate environment configuration (Requirement 8.1, 8.2)
  const configValid = validateEnvironmentVariables();
  
  // Step 2: Test database connectivity (Requirement 8.3)
  let connectionSuccessful = false;
  if (configValid) {
    connectionSuccessful = await testDatabaseConnection();
  }
  
  // Step 3: Provide setup guidance
  printSetupInstructions(configValid, connectionSuccessful);
  printDocumentation();
  
  // Exit with appropriate code
  if (configValid && connectionSuccessful) {
    console.log('\n🎉 Database configuration verification complete!');
    process.exit(0);
  } else {
    console.log('\n⚠️  Database configuration needs attention.');
    process.exit(1);
  }
}

main().catch(console.error);