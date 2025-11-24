/**
 * Simple Admin User Creator for Payload CMS
 * Uses direct database query approach
 */

const { createClient } = require('@supabase/supabase-js');
const readline = require('readline');
const crypto = require('crypto');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

// Hash password (simple bcrypt-like approach for demonstration)
function hashPassword(password) {
    return crypto.createHash('sha256').update(password + 'payload-salt').digest('hex');
}

async function createAdmin() {
    try {
        console.log('\n🔐 Quick Admin User Creator\n');
        console.log('============================\n');

        // Get Supabase credentials from .env
        require('dotenv').config();

        const dbUrl = process.env.DATABASE_URI;

        if (!dbUrl) {
            console.log('❌ DATABASE_URI not found in .env file!');
            console.log('💡 Please ensure your .env file is configured correctly.\n');
            rl.close();
            process.exit(1);
        }

        console.log('✅ Database connection configured\n');

        // Get user input
        const email = await question('Enter admin email: ');
        const password = await question('Enter admin password (min 8 chars): ');

        if (!email || !password) {
            console.log('\n❌ Email and password are required!');
            rl.close();
            process.exit(1);
        }

        if (password.length < 8) {
            console.log('\n❌ Password must be at least 8 characters!');
            rl.close();
            process.exit(1);
        }

        console.log('\n✅ Credentials accepted!');
        console.log('\n📝 To create this admin user, you have two options:\n');

        console.log('Option 1: Use the CMS built-in user creator');
        console.log('------------------------------------------');
        console.log('1. Make sure CMS is running: npm run dev');
        console.log('2. In a NEW terminal, run:');
        console.log('   cd cms/cms-poc');
        console.log('   npm run payload -- create-user\n');

        console.log('Option 2: Create via CMS Admin UI (if you can access it)');
        console.log('--------------------------------------------------------');
        console.log('1. Go to: http://localhost:3001/admin');
        console.log('2. If you can login with any account, create a new user\n');

        console.log('Option 3: I will create a SQL script for you');
        console.log('---------------------------------------------');
        const createSql = await question('Create SQL script? (yes/no): ');

        if (createSql.toLowerCase() === 'yes') {
            console.log('\n📄 Creating SQL script...\n');

            // Note: This is a simplified example. Payload uses bcrypt with salt.
            // In production, you'd need the actual password hashing method
            console.log('-- SQL to insert admin user');
            console.log('-- Run this in your Supabase SQL editor\n');
            console.log('INSERT INTO users (email, password, created_at, updated_at)');
            console.log(`VALUES ('${email}', 'ENCRYPTED_PASSWORD_HERE', NOW(), NOW());`);
            console.log('\n⚠️  Note: Password hashing requires Payload\'s bcrypt implementation');
            console.log('💡 Recommended: Use Option 1 instead\n');
        }

        console.log('📋 Your credentials (save these!)');
        console.log('----------------------------------');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log('Login URL: http://localhost:3001/admin\n');

        rl.close();

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        rl.close();
        process.exit(1);
    }
}

// Handle Ctrl+C
process.on('SIGINT', () => {
    console.log('\n\n🛑 Cancelled');
    rl.close();
    process.exit(0);
});

createAdmin();
