/**
 * Reset or Create Admin User for Payload CMS
 */

import { getPayload } from 'payload';
import config from './src/payload.config.js';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function resetAdmin() {
    let payload;

    try {
        console.log('\n🔐 Payload CMS Admin Reset Tool\n');
        console.log('================================\n');

        // Initialize Payload
        console.log('🔄 Connecting to Payload CMS...\n');
        payload = await getPayload({ config });

        // List existing users
        console.log('📋 Checking existing admin users...\n');
        const users = await payload.find({
            collection: 'users',
            limit: 10,
        });

        if (users.docs.length > 0) {
            console.log(`Found ${users.docs.length} user(s):\n`);
            users.docs.forEach((user, index) => {
                console.log(`${index + 1}. Email: ${user.email}`);
            });
            console.log('\n');
        } else {
            console.log('No existing users found.\n');
        }

        // Ask what to do
        console.log('What would you like to do?');
        console.log('1. Create a NEW admin user');
        console.log('2. Update password for existing user');
        console.log('3. Exit\n');

        const choice = await question('Enter your choice (1-3): ');

        if (choice === '1') {
            // Create new admin user
            console.log('\n📝 Creating new admin user...\n');

            const email = await question('Enter email: ');
            const password = await question('Enter password (min 8 characters): ');

            if (!email || !password) {
                console.log('\n❌ Email and password are required!');
                rl.close();
                process.exit(1);
            }

            if (password.length < 8) {
                console.log('\n❌ Password must be at least 8 characters long!');
                rl.close();
                process.exit(1);
            }

            const newUser = await payload.create({
                collection: 'users',
                data: {
                    email: email.trim(),
                    password: password,
                },
            });

            console.log('\n✅ Admin user created successfully!');
            console.log(`📧 Email: ${newUser.email}`);
            console.log(`🔗 Login at: http://localhost:3001/admin\n`);

        } else if (choice === '2') {
            // Update existing user password
            if (users.docs.length === 0) {
                console.log('\n❌ No users found to update!');
                rl.close();
                process.exit(1);
            }

            const userEmail = await question('\nEnter the email of the user to update: ');
            const newPassword = await question('Enter new password (min 8 characters): ');

            if (newPassword.length < 8) {
                console.log('\n❌ Password must be at least 8 characters long!');
                rl.close();
                process.exit(1);
            }

            // Find user by email
            const userToUpdate = users.docs.find(u => u.email === userEmail.trim());

            if (!userToUpdate) {
                console.log(`\n❌ User with email "${userEmail}" not found!`);
                rl.close();
                process.exit(1);
            }

            await payload.update({
                collection: 'users',
                id: userToUpdate.id,
                data: {
                    password: newPassword,
                },
            });

            console.log('\n✅ Password updated successfully!');
            console.log(`📧 Email: ${userEmail}`);
            console.log(`🔗 Login at: http://localhost:3001/admin\n`);

        } else {
            console.log('\n👋 Goodbye!');
        }

        rl.close();
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        rl.close();
        process.exit(1);
    }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
    console.log('\n\n🛑 Process cancelled');
    rl.close();
    process.exit(0);
});

// Run the script
resetAdmin();
