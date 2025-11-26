import fetch from 'node-fetch';

const PAYLOAD_URL = 'http://localhost:3000';

async function testProductsCollection() {
  console.log('🧪 Testing Products Collection...\n');

  try {
    // Test 1: Check if Products API endpoint exists
    console.log('1. Testing Products API endpoint...');
    const response = await fetch(`${PAYLOAD_URL}/api/products`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Products API endpoint is accessible');
      console.log(`   - Status: ${response.status}`);
      console.log(`   - Total products: ${data.totalDocs || 0}`);
      console.log(`   - Has pagination: ${data.hasNextPage !== undefined ? 'Yes' : 'No'}`);
    } else {
      console.log('❌ Products API endpoint failed');
      console.log(`   - Status: ${response.status}`);
      console.log(`   - Error: ${await response.text()}`);
      return;
    }

    // Test 2: Check API structure
    console.log('\n2. Testing API response structure...');
    const apiResponse = await fetch(`${PAYLOAD_URL}/api/products`);
    const apiData = await apiResponse.json();
    
    console.log('✅ API Response Structure:');
    console.log(`   - docs: ${Array.isArray(apiData.docs) ? 'Array' : 'Not Array'}`);
    console.log(`   - totalDocs: ${typeof apiData.totalDocs}`);
    console.log(`   - limit: ${typeof apiData.limit}`);
    console.log(`   - page: ${typeof apiData.page}`);
    console.log(`   - hasNextPage: ${typeof apiData.hasNextPage}`);
    console.log(`   - hasPrevPage: ${typeof apiData.hasPrevPage}`);

    // Test 3: Check if we can access the admin interface for products
    console.log('\n3. Testing admin interface accessibility...');
    const adminResponse = await fetch(`${PAYLOAD_URL}/admin/collections/products`);
    
    if (adminResponse.ok || adminResponse.status === 401) {
      console.log('✅ Products admin interface is accessible');
      console.log(`   - Status: ${adminResponse.status} (401 is expected without auth)`);
    } else {
      console.log('❌ Products admin interface failed');
      console.log(`   - Status: ${adminResponse.status}`);
    }

    console.log('\n🎉 Products Collection Test Complete!');
    console.log('\nNext steps:');
    console.log('1. Visit http://localhost:3000/admin to access the admin interface');
    console.log('2. Create a new product with name, description, image, and link');
    console.log('3. Verify the API serves product data with proper image URLs');

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

testProductsCollection();