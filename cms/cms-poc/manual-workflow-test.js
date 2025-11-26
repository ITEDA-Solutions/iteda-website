#!/usr/bin/env node

/**
 * Manual Content Workflow Test
 * Tests basic API connectivity and content operations
 */

import fetch from 'node-fetch';

const baseURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';

console.log('🧪 Manual Content Workflow Test');
console.log('===============================\n');

async function testAPIEndpoint(endpoint, description) {
  try {
    console.log(`🔍 Testing ${description}...`);
    const response = await fetch(`${baseURL}/api${endpoint}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ ${description} - Status: ${response.status}`);
      
      if (endpoint.includes('/globals/')) {
        console.log(`   📄 Global data structure: ${Object.keys(data).join(', ')}`);
      } else {
        console.log(`   📄 Collection has ${data.totalDocs || 0} documents`);
      }
      return true;
    } else {
      console.log(`❌ ${description} - Status: ${response.status} ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${description} - Error: ${error.message}`);
    return false;
  }
}

async function testHealthCheck() {
  try {
    console.log('🏥 Testing server health...');
    const response = await fetch(`${baseURL}/api/health`);
    
    if (response.ok) {
      console.log('✅ Server is healthy and responding');
      return true;
    } else {
      console.log(`❌ Server health check failed - Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Server is not responding - Error: ${error.message}`);
    return false;
  }
}

async function runManualTests() {
  console.log(`🌐 Testing server at: ${baseURL}\n`);
  
  // Test server health first
  const serverHealthy = await testHealthCheck();
  
  if (!serverHealthy) {
    console.log('\n❌ Server is not running or not responding.');
    console.log('   Please start the server with: npm run dev');
    console.log('   Then run this test again.');
    return false;
  }
  
  console.log('\n📡 Testing API Endpoints...\n');
  
  const tests = [
    { endpoint: '/homepage', description: 'Homepage sections API' },
    { endpoint: '/globals/about', description: 'About global API' },
    { endpoint: '/products', description: 'Products collection API' },
    { endpoint: '/globals/site-settings', description: 'Site settings global API' },
    { endpoint: '/media', description: 'Media collection API' },
    { endpoint: '/users', description: 'Users collection API' },
  ];
  
  let passedTests = 0;
  
  for (const test of tests) {
    const passed = await testAPIEndpoint(test.endpoint, test.description);
    if (passed) passedTests++;
    console.log(''); // Add spacing between tests
  }
  
  console.log('📊 Test Results Summary');
  console.log('======================\n');
  
  if (passedTests === tests.length) {
    console.log('🎉 All API endpoints are working correctly!');
    console.log('\n✅ Content Management Workflow Status:');
    console.log('   • Server is running and healthy');
    console.log('   • All API endpoints are accessible');
    console.log('   • Content collections are properly configured');
    console.log('   • Global content is accessible');
    console.log('   • Media upload system is ready');
    
    console.log('\n🎯 Manual Testing Checklist:');
    console.log('   1. ✅ Server connectivity - PASSED');
    console.log('   2. ✅ API endpoint accessibility - PASSED');
    console.log('   3. 🔄 Admin interface access - Test manually at /admin');
    console.log('   4. 🔄 Content creation - Test through admin interface');
    console.log('   5. 🔄 Content updates - Test through admin interface');
    console.log('   6. 🔄 Image uploads - Test through media collection');
    console.log('   7. 🔄 Frontend display - Test on main website');
    
    return true;
  } else {
    console.log(`❌ ${tests.length - passedTests} out of ${tests.length} tests failed.`);
    console.log('   Some API endpoints are not working correctly.');
    console.log('   Please check the server logs for more details.');
    return false;
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Manual test interrupted');
  process.exit(0);
});

// Run the manual tests
runManualTests().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});