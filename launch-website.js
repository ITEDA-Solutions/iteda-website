#!/usr/bin/env node

/**
 * Launch Complete Website
 * Starts both CMS backend and frontend with connection verification
 */

import { spawn } from 'child_process';
import fs from 'fs';

console.log('🚀 Launching Complete Website');
console.log('=============================\n');

async function launchWebsite() {
  console.log('📋 Pre-launch Checklist...\n');

  // Check if directories exist
  if (!fs.existsSync('cms/cms-poc')) {
    console.log('❌ CMS directory not found');
    return false;
  }

  if (!fs.existsSync('src')) {
    console.log('❌ Frontend source directory not found');
    return false;
  }

  console.log('✅ Project structure verified');

  // Check environment files
  if (!fs.existsSync('cms/cms-poc/.env')) {
    console.log('❌ CMS environment file not found');
    return false;
  }

  if (!fs.existsSync('.env.local')) {
    console.log('❌ Frontend environment file not found');
    return false;
  }

  console.log('✅ Environment files found');

  // Verify Supabase connection is configured
  const cmsEnv = fs.readFileSync('cms/cms-poc/.env', 'utf8');
  const frontendEnv = fs.readFileSync('.env.local', 'utf8');

  if (!cmsEnv.includes('veuwholghctlpfqjdlht.supabase.co')) {
    console.log('❌ CMS Supabase connection not configured');
    return false;
  }

  if (!frontendEnv.includes('http://localhost:3001')) {
    console.log('❌ Frontend CMS URL not configured');
    return false;
  }

  console.log('✅ Supabase and CMS connections configured');

  console.log('\n🎯 Starting Services...\n');

  // Start CMS Backend
  console.log('1️⃣  Starting CMS Backend (Payload CMS)...');
  const cmsProcess = spawn('npm', ['run', 'dev'], {
    cwd: 'cms/cms-poc',
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true
  });

  let cmsReady = false;
  let cmsOutput = '';

  cmsProcess.stdout.on('data', (data) => {
    const output = data.toString();
    cmsOutput += output;
    
    if (output.includes('Ready') || output.includes('localhost:3001')) {
      cmsReady = true;
      console.log('   ✅ CMS Backend ready at http://localhost:3001');
    }
  });

  cmsProcess.stderr.on('data', (data) => {
    const output = data.toString();
    cmsOutput += output;
    
    if (output.includes('Ready') || output.includes('localhost:3001')) {
      cmsReady = true;
      console.log('   ✅ CMS Backend ready at http://localhost:3001');
    }
  });

  // Wait for CMS to be ready
  let attempts = 0;
  const maxAttempts = 30; // 30 seconds timeout
  
  while (!cmsReady && attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    attempts++;
    
    if (attempts % 5 === 0) {
      console.log(`   ⏳ Waiting for CMS backend... (${attempts}/${maxAttempts})`);
    }
  }

  if (!cmsReady) {
    console.log('   ❌ CMS Backend failed to start within timeout');
    console.log('   📄 CMS Output:', cmsOutput.slice(-500)); // Last 500 chars
    cmsProcess.kill();
    return false;
  }

  // Wait additional 3 seconds for database connection
  console.log('   ⏳ Establishing database connection...');
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Start Frontend
  console.log('\n2️⃣  Starting Frontend (Next.js)...');
  const frontendProcess = spawn('npm', ['run', 'dev'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true
  });

  let frontendReady = false;
  let frontendOutput = '';

  frontendProcess.stdout.on('data', (data) => {
    const output = data.toString();
    frontendOutput += output;
    
    if (output.includes('Ready') || output.includes('localhost:3000')) {
      frontendReady = true;
      console.log('   ✅ Frontend ready at http://localhost:3000');
    }
  });

  frontendProcess.stderr.on('data', (data) => {
    const output = data.toString();
    frontendOutput += output;
    
    if (output.includes('Ready') || output.includes('localhost:3000')) {
      frontendReady = true;
      console.log('   ✅ Frontend ready at http://localhost:3000');
    }
  });

  // Wait for Frontend to be ready
  attempts = 0;
  
  while (!frontendReady && attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    attempts++;
    
    if (attempts % 5 === 0) {
      console.log(`   ⏳ Waiting for frontend... (${attempts}/${maxAttempts})`);
    }
  }

  if (!frontendReady) {
    console.log('   ❌ Frontend failed to start within timeout');
    console.log('   📄 Frontend Output:', frontendOutput.slice(-500)); // Last 500 chars
    frontendProcess.kill();
    cmsProcess.kill();
    return false;
  }

  // Test connections
  console.log('\n3️⃣  Testing Connections...\n');

  // Test CMS API
  try {
    console.log('   🔍 Testing CMS API...');
    const cmsResponse = await fetch('http://localhost:3001/api/homepage');
    if (cmsResponse.ok) {
      console.log('   ✅ CMS API responding correctly');
    } else {
      console.log(`   ⚠️  CMS API returned status: ${cmsResponse.status}`);
    }
  } catch (error) {
    console.log('   ❌ CMS API not accessible:', error.message);
  }

  // Test Frontend
  try {
    console.log('   🔍 Testing Frontend...');
    const frontendResponse = await fetch('http://localhost:3000');
    if (frontendResponse.ok) {
      console.log('   ✅ Frontend responding correctly');
    } else {
      console.log(`   ⚠️  Frontend returned status: ${frontendResponse.status}`);
    }
  } catch (error) {
    console.log('   ❌ Frontend not accessible:', error.message);
  }

  // Test CMS-Frontend Connection
  try {
    console.log('   🔍 Testing CMS-Frontend Connection...');
    const testResponse = await fetch('http://localhost:3000');
    if (testResponse.ok) {
      const html = await testResponse.text();
      const hasCMSContent = html.includes('HomepageCMSContent') || html.includes('cms');
      if (hasCMSContent) {
        console.log('   ✅ CMS-Frontend connection working');
      } else {
        console.log('   ⚠️  CMS content may not be loading on frontend');
      }
    }
  } catch (error) {
    console.log('   ❌ Could not test CMS-Frontend connection:', error.message);
  }

  console.log('\n🎉 Website Launch Complete!\n');

  console.log('🌐 Access Your Website:');
  console.log('   • Frontend: http://localhost:3000');
  console.log('   • CMS Admin: http://localhost:3001/admin');
  console.log('   • CMS API: http://localhost:3001/api');

  console.log('\n📋 Next Steps:');
  console.log('   1. Create admin user: node create-admin-user.js');
  console.log('   2. Access CMS admin: http://localhost:3001/admin');
  console.log('   3. Create content in CMS');
  console.log('   4. View changes on frontend: http://localhost:3000');

  console.log('\n🛑 To stop servers: Press Ctrl+C');

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down servers...');
    frontendProcess.kill('SIGINT');
    cmsProcess.kill('SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\n🛑 Terminating servers...');
    frontendProcess.kill('SIGTERM');
    cmsProcess.kill('SIGTERM');
    process.exit(0);
  });

  // Keep the process running
  return new Promise((resolve) => {
    frontendProcess.on('close', (code) => {
      console.log(`\n📊 Frontend exited with code ${code}`);
      cmsProcess.kill();
      resolve(false);
    });

    cmsProcess.on('close', (code) => {
      console.log(`\n📊 CMS Backend exited with code ${code}`);
      frontendProcess.kill();
      resolve(false);
    });
  });
}

// Run the launch script
launchWebsite().catch(error => {
  console.error('❌ Launch failed:', error);
  process.exit(1);
});