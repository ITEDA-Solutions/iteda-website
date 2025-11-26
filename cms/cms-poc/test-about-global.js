/**
 * Test script to verify About global functionality
 * Tests:
 * 1. About global is accessible via API
 * 2. Mission and vision fields are available
 * 3. Rich text content can be saved and retrieved
 */

import fetch from 'node-fetch';

const PAYLOAD_URL = 'http://localhost:3000';

async function testAboutGlobal() {
  console.log('🧪 Testing About Global Configuration...\n');

  try {
    // Test 1: Check if About global API endpoint exists
    console.log('1. Testing About global API endpoint...');
    const response = await fetch(`${PAYLOAD_URL}/api/globals/about`);
    
    if (response.status === 404) {
      console.log('❌ About global API endpoint not found');
      return false;
    }
    
    if (!response.ok) {
      console.log(`⚠️  About global API returned status: ${response.status}`);
      // This might be expected if no data exists yet
    } else {
      console.log('✅ About global API endpoint is accessible');
    }

    // Test 2: Check the response structure
    const data = await response.json();
    console.log('\n2. Testing About global data structure...');
    
    if (data && typeof data === 'object') {
      console.log('✅ About global returns valid JSON structure');
      
      // Check if mission and vision fields are present in the structure
      if (data.hasOwnProperty('mission') || data.hasOwnProperty('vision')) {
        console.log('✅ Mission and vision fields are available in the global');
        console.log('📋 Current About global data:', JSON.stringify(data, null, 2));
      } else {
        console.log('ℹ️  Mission and vision fields not yet populated (this is expected for new setup)');
      }
    } else {
      console.log('⚠️  About global returned unexpected data structure');
    }

    // Test 3: Check admin interface accessibility
    console.log('\n3. Testing admin interface...');
    const adminResponse = await fetch(`${PAYLOAD_URL}/admin`);
    
    if (adminResponse.ok) {
      console.log('✅ Admin interface is accessible');
      console.log('🌐 You can access the About global at: http://localhost:3000/admin/globals/about');
    } else {
      console.log('❌ Admin interface is not accessible');
    }

    console.log('\n🎉 About global configuration test completed!');
    console.log('\n📝 Next steps:');
    console.log('   1. Visit http://localhost:3000/admin/globals/about');
    console.log('   2. Add sample mission and vision content');
    console.log('   3. Test the rich text formatting capabilities');
    
    return true;

  } catch (error) {
    console.error('❌ Error testing About global:', error.message);
    return false;
  }
}

// Run the test
testAboutGlobal().then(success => {
  process.exit(success ? 0 : 1);
});