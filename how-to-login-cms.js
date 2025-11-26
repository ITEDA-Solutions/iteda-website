/**
 * Simple script to show you how to regain CMS admin access
 */

console.log('\n🔐 CMS Admin Access Recovery Guide\n');
console.log('===================================\n');

console.log('Your CMS is running at: http://localhost:3001\n');

console.log('📋 METHOD 1: Create Admin via Browser Console\n');
console.log('1. Open: http://localhost:3001/admin/login');
console.log('2. Press F12 to open Developer Tools');
console.log('3. Go to Console tab');
console.log('4. Paste this code:\n');

console.log(`
fetch('http://localhost:3001/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@itedasolutions.com',
    password: 'SecurePassword123'
  })
}).then(r => r.json())
  .then(d => console.log('✅ Created:', d))
  .catch(e => console.error('❌ Error:', e));
`);

console.log('\n5. Press Enter');
console.log('6. Login with:');
console.log('   Email: admin@itedasolutions.com');
console.log('   Password: SecurePassword123\n');

console.log('---\n');

console.log('📋 METHOD 2: Check Supabase Database\n');
console.log('1. Go to: https://supabase.com');
console.log('2. Login to your account');
console.log('3. Select your ITEDA project');
console.log('4. Open SQL Editor');
console.log('5. Run this query:\n');
console.log('   SELECT id, email, created_at FROM users;\n');
console.log('6. This shows all existing admin accounts\n');

console.log('---\n');

console.log('📋 METHOD 3: Quick Test\n');
console.log('Try these common credentials:\n');
console.log('• Email: admin@itedasolutions.com');
console.log('• Email: test@test.com');
console.log('• Email: admin@test.com\n');
console.log('• Passwords to try: admin123, password123, test1234\n');

console.log('---\n');

console.log('💡 TIP: After you regain access, create a new user and WRITE DOWN the credentials!\n');

console.log('🔗 Login URL: http://localhost:3001/admin\n');
