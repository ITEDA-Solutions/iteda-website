#!/usr/bin/env node

/**
 * CMS Login Guide
 * Step-by-step guide to access Payload CMS
 */

console.log('🔐 Payload CMS Login Guide');
console.log('=========================\n');

async function showLoginGuide() {
  console.log('📋 Step-by-Step Access Guide:\n');

  // Step 1: Check if CMS server is running
  console.log('1️⃣  Check CMS Server Status');
  try {
    const response = await fetch('http://localhost:3001/api/users');
    if (response.ok) {
      console.log('   ✅ CMS server is running at http://localhost:3001');
    } else {
      console.log('   ❌ CMS server is not responding properly');
      console.log('   🔧 Start server: node start-cms-backend.js');
      return;
    }
  } catch (error) {
    console.log('   ❌ CMS server is not running');
    console.log('   🔧 Start server: node start-cms-backend.js');
    return;
  }

  // Step 2: Check for existing users
  console.log('\n2️⃣  Check Admin Users');
  try {
    const response = await fetch('http://localhost:3001/api/users');
    const userData = await response.json();
    
    if (userData.totalDocs === 0) {
      console.log('   ❌ No admin users found');
      console.log('   🔧 Create admin user: node create-admin-user.js');
      return;
    } else {
      console.log(`   ✅ Found ${userData.totalDocs} admin user(s)`);
      userData.docs.forEach((user, index) => {
        console.log(`      ${index + 1}. ${user.email}`);
      });
    }
  } catch (error) {
    console.log('   ❌ Could not check users');
    return;
  }

  // Step 3: Access instructions
  console.log('\n3️⃣  Access Admin Interface');
  console.log('   🌐 URL: http://localhost:3001/admin');
  console.log('   📧 Use any email from the list above');
  console.log('   🔒 Enter the password you set for that user');

  // Step 4: What you can do
  console.log('\n4️⃣  What You Can Do in the Admin Interface');
  console.log('   📄 Homepage Sections - Create hero, about, CTA sections');
  console.log('   🛍️  Products - Add products with images and descriptions');
  console.log('   📸 Media - Upload and manage images');
  console.log('   📖 About - Edit mission and vision statements');
  console.log('   ⚙️  Site Settings - Update contact info and social links');

  // Step 5: Viewing changes
  console.log('\n5️⃣  View Your Changes');
  console.log('   🌐 Frontend: http://localhost:3000');
  console.log('   ⏱️  Changes appear within 60 seconds');
  console.log('   🔄 Force refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)');

  console.log('\n🎯 Quick Actions:');
  console.log('   • Open admin: http://localhost:3001/admin');
  console.log('   • View website: http://localhost:3000');
  console.log('   • Check users: node check-existing-users.js');
  console.log('   • Create user: node create-admin-user.js');
  console.log('   • Reset access: node reset-admin-access.js');

  console.log('\n🆘 Need Help?');
  console.log('   • Check server: node check-cms-connection.js');
  console.log('   • Start CMS: node start-cms-backend.js');
  console.log('   • Full guide: Read PAYLOAD-ACCESS-GUIDE.md');

  console.log('\n🎉 You\'re all set! Open http://localhost:3001/admin to start managing content.');
}

// Run the guide
showLoginGuide().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});