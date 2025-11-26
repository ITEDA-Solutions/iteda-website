#!/usr/bin/env node

/**
 * Start CMS Backend with Supabase Connection
 * Automated script to start Payload CMS with proper database connection
 */

import { spawn } from 'child_process';
import fs from 'fs';

console.log('🚀 Starting Payload CMS Backend');
console.log('===============================\n');

async function startCMSBackend() {
  // Check if we're in the right directory
  if (!fs.existsSync('cms/cms-poc')) {
    console.log('❌ Error: cms/cms-poc directory not found');
    console.log('   Please run this script from the project root directory');
    return false;
  }

  // Check if environment is configured
  const envPath = 'cms/cms-poc/.env';
  if (!fs.existsSync(envPath)) {
    console.log('❌ Error: .env file not found in cms/cms-poc');
    console.log('   Please ensure the environment is properly configured');
    return false;
  }

  // Verify Supabase connection is configured
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (!envContent.includes('veuwholghctlpfqjdlht.supabase.co')) {
    console.log('❌ Error: Supabase connection not configured');
    console.log('   Please update the DATABASE_URI in cms/cms-poc/.env');
    return false;
  }

  console.log('✅ Environment configuration verified');
  console.log('✅ Supabase connection configured');
  console.log('✅ Starting CMS server...\n');

  // Start the CMS server
  const cmsProcess = spawn('npm', ['run', 'dev'], {
    cwd: 'cms/cms-poc',
    stdio: 'inherit',
    shell: true
  });

  console.log('🌐 CMS Server Details:');
  console.log('   • URL: http://localhost:3001');
  console.log('   • Admin: http://localhost:3001/admin');
  console.log('   • Database: Supabase PostgreSQL');
  console.log('   • Status: Starting...\n');

  console.log('⏳ Please wait for the server to initialize...');
  console.log('   This may take 30-60 seconds for first startup');
  console.log('   You\'ll see "Ready" when the server is available\n');

  console.log('📋 Next Steps:');
  console.log('   1. Wait for "Ready" message');
  console.log('   2. Create admin user: node create-admin-user.js');
  console.log('   3. Access admin: http://localhost:3001/admin');
  console.log('   4. Start managing content!\n');

  console.log('🛑 To stop the server: Press Ctrl+C\n');

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping CMS server...');
    cmsProcess.kill('SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\n🛑 Terminating CMS server...');
    cmsProcess.kill('SIGTERM');
    process.exit(0);
  });

  cmsProcess.on('close', (code) => {
    console.log(`\n📊 CMS server exited with code ${code}`);
    process.exit(code);
  });

  cmsProcess.on('error', (error) => {
    console.error(`\n❌ Error starting CMS server: ${error.message}`);
    process.exit(1);
  });

  return true;
}

// Run the startup script
startCMSBackend().catch(error => {
  console.error('❌ Startup failed:', error);
  process.exit(1);
});