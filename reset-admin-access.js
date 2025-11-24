#!/usr/bin/env node

/**
 * Reset Admin Access for Payload CMS
 * Helps reset or create new admin access when needed
 */

import readline from 'readline';

console.log('🔄 Reset Payload CMS Admin Access');
console.log('=================================\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function resetAdminAccess() {
  console.log('🔐 This will help you regain access to your Payload CMS admin interface');
  console.log('   Choose an option below:\n');

  console.log('1. 👥 Check existing users');
  console.log('2. 👤 Create new admin user');
  console.log('3. 🔄 Reset database and create fresh admin user');
  console.log('4. 🚪 Exit\n');

  const choice = await askQuestion('Enter your choice (1-4): ');

  switch (choice) {
    case '1':
      console.log('\n🔍 Checking existing users...\n');
      rl.close();
      
      // Import and run the check users script
      const { spawn } = await import('child_process');
      const checkProcess = spawn('node', ['check-existing-users.js'], {
        stdio: 'inherit'
      });
      
      checkProcess.on('close', (code) => {
        process.exit(code);
      });
      break;

    case '2':
      console.log('\n👤 Creating new admin user...\n');
      rl.close();
      
      // Import and run the create user script
      const createProcess = spawn('node', ['create-admin-user.js'], {
        stdio: 'inherit'
      });
      
      createProcess.on('close', (code) => {
        process.exit(code);
      });
      break;

    case '3':
      console.log('\n⚠️  WARNING: This will reset your database and delete all content!');
      const confirm = await askQuestion('Are you sure? Type "yes" to continue: ');
      
      if (confirm.toLowerCase() === 'yes') {
        console.log('\n🔄 Resetting database...');
        
        // This would require database reset functionality
        console.log('❌ Database reset functionality not implemented yet');
        console.log('   Please manually reset your Supabase database if needed');
        console.log('   Then run option 2 to create a new admin user');
      } else {
        console.log('\n✅ Reset cancelled');
      }
      
      rl.close();
      break;

    case '4':
      console.log('\n👋 Goodbye!');
      rl.close();
      break;

    default:
      console.log('\n❌ Invalid choice. Please enter 1, 2, 3, or 4');
      rl.close();
      break;
  }
}

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n\n🛑 Reset cancelled');
  rl.close();
  process.exit(0);
});

// Run the reset process
resetAdminAccess().catch(error => {
  console.error('❌ Error:', error.message);
  rl.close();
  process.exit(1);
});