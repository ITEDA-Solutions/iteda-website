#!/usr/bin/env node

/**
 * Create Admin User for Payload CMS
 * Interactive script to create your first admin user
 */

import readline from 'readline';

console.log('👤 Create Payload CMS Admin User');
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

function askPassword(question) {
  return new Promise((resolve) => {
    process.stdout.write(question);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    let password = '';
    
    process.stdin.on('data', function(char) {
      char = char + '';
      
      switch(char) {
        case '\n':
        case '\r':
        case '\u0004':
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdout.write('\n');
          resolve(password);
          break;
        case '\u0003':
          process.exit();
          break;
        case '\u007f': // Backspace
          if (password.length > 0) {
            password = password.slice(0, -1);
            process.stdout.write('\b \b');
          }
          break;
        default:
          password += char;
          process.stdout.write('*');
          break;
      }
    });
  });
}

async function createAdminUser() {
  console.log('🔐 This will create your first admin user for Payload CMS');
  console.log('   You\'ll use these credentials to log into the admin interface\n');

  try {
    // Get user input
    const email = await askQuestion('📧 Enter admin email: ');
    
    if (!email || !email.includes('@')) {
      console.log('❌ Please enter a valid email address');
      rl.close();
      return;
    }

    const password = await askPassword('🔒 Enter password (min 8 characters): ');
    
    if (!password || password.length < 8) {
      console.log('\n❌ Password must be at least 8 characters long');
      rl.close();
      return;
    }

    const confirmPassword = await askPassword('🔒 Confirm password: ');
    
    if (password !== confirmPassword) {
      console.log('\n❌ Passwords do not match');
      rl.close();
      return;
    }

    console.log('\n✅ Creating admin user...\n');

    // Create the user creation script
    const userCreationScript = `
const { getPayload } = require('payload');
const config = require('./src/payload.config.ts').default;

async function createUser() {
  try {
    const payload = await getPayload({ config });
    
    const user = await payload.create({
      collection: 'users',
      data: {
        email: '${email}',
        password: '${password}',
      },
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', user.email);
    console.log('🆔 ID:', user.id);
    console.log('');
    console.log('🌐 You can now access the admin interface at:');
    console.log('   http://localhost:3001/admin');
    console.log('');
    console.log('🔐 Login with:');
    console.log('   Email: ${email}');
    console.log('   Password: [the password you entered]');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating user:', error.message);
    
    if (error.message.includes('duplicate key')) {
      console.log('');
      console.log('💡 This email is already registered.');
      console.log('   Try logging in with existing credentials or use a different email.');
    }
    
    if (error.message.includes('connect')) {
      console.log('');
      console.log('💡 Database connection issue.');
      console.log('   Make sure the CMS server is running and database is connected.');
    }
    
    process.exit(1);
  }
}

createUser();
`;

    // Write the script to a temporary file
    const fs = await import('fs');
    const tempScriptPath = 'cms/cms-poc/create-user-temp.js';
    fs.writeFileSync(tempScriptPath, userCreationScript);

    // Execute the script
    const { spawn } = await import('child_process');
    
    console.log('🔄 Connecting to database and creating user...');
    
    const createProcess = spawn('node', [tempScriptPath], {
      cwd: 'cms/cms-poc',
      stdio: 'inherit'
    });

    createProcess.on('close', (code) => {
      // Clean up temp file
      try {
        fs.unlinkSync(tempScriptPath);
      } catch (e) {
        // Ignore cleanup errors
      }
      
      if (code === 0) {
        console.log('\n🎉 Admin user setup complete!');
        console.log('\n📋 Next steps:');
        console.log('   1. Make sure CMS server is running: node start-cms-backend.js');
        console.log('   2. Open http://localhost:3001/admin in your browser');
        console.log('   3. Login with your new credentials');
        console.log('   4. Start creating content!');
      } else {
        console.log('\n❌ User creation failed');
        console.log('\n🔧 Troubleshooting:');
        console.log('   • Make sure the CMS server is running');
        console.log('   • Check that Supabase database is connected');
        console.log('   • Try running: node check-cms-connection.js');
      }
      
      rl.close();
    });

    createProcess.on('error', (error) => {
      console.error('\n❌ Error running user creation:', error.message);
      
      // Clean up temp file
      try {
        fs.unlinkSync(tempScriptPath);
      } catch (e) {
        // Ignore cleanup errors
      }
      
      rl.close();
    });

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    rl.close();
  }
}

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n\n🛑 User creation cancelled');
  rl.close();
  process.exit(0);
});

// Run the user creation process
createAdminUser();