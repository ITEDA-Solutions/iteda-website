import readline from 'readline'
import fs from 'fs'
import { execSync } from 'child_process'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim())
    })
  })
}

async function interactiveSetup() {
  console.log('🚀 Interactive Supabase + Vercel Deployment Setup\n')
  console.log('This script will guide you through deploying your CMS to Vercel with Supabase.\n')

  // Step 1: Supabase Setup
  console.log('📋 STEP 1: Supabase Database Setup')
  console.log('=' .repeat(50))
  
  const hasSupabase = await askQuestion('Do you have a Supabase project ready? (y/n): ')
  
  if (hasSupabase.toLowerCase() !== 'y') {
    console.log('\n🔗 Please follow these steps to set up Supabase:')
    console.log('1. Go to https://supabase.com')
    console.log('2. Sign up or log in to your account')
    console.log('3. Click "New Project"')
    console.log('4. Choose your organization and set project details')
    console.log('5. Wait for the project to be created (this may take a few minutes)')
    console.log('\nPress Enter when your Supabase project is ready...')
    await askQuestion('')
  }

  console.log('\n📊 Now let\'s get your Supabase connection details:')
  console.log('1. Go to your Supabase project dashboard')
  console.log('2. Navigate to Settings > Database')
  console.log('3. Find the "Connection string" section')
  console.log('4. Copy the PostgreSQL connection string\n')

  const databaseUri = await askQuestion('Paste your Supabase PostgreSQL connection string here: ')
  
  if (!databaseUri.includes('supabase.co')) {
    console.log('⚠️  Warning: This doesn\'t look like a Supabase connection string.')
    const proceed = await askQuestion('Do you want to continue anyway? (y/n): ')
    if (proceed.toLowerCase() !== 'y') {
      console.log('Setup cancelled. Please get the correct Supabase connection string.')
      rl.close()
      return
    }
  }

  // Step 2: Generate Payload Secret
  console.log('\n🔐 STEP 2: Generate Payload Secret')
  console.log('=' .repeat(50))
  
  const generateSecret = await askQuestion('Do you want to generate a new PAYLOAD_SECRET? (y/n): ')
  let payloadSecret = ''
  
  if (generateSecret.toLowerCase() === 'y') {
    // Generate a random 32-character secret
    payloadSecret = Array.from({length: 32}, () => Math.random().toString(36)[2]).join('')
    console.log(`Generated PAYLOAD_SECRET: ${payloadSecret}`)
  } else {
    payloadSecret = await askQuestion('Enter your PAYLOAD_SECRET (32+ characters): ')
  }

  // Step 3: Update .env file
  console.log('\n📝 STEP 3: Update Environment Variables')
  console.log('=' .repeat(50))
  
  const envContent = `# Supabase PostgreSQL connection
DATABASE_URI=${databaseUri}

# Payload CMS secret key
PAYLOAD_SECRET=${payloadSecret}

# Next.js configuration
# For local development
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
# For production (will be updated after Vercel deployment)
# NEXT_PUBLIC_PAYLOAD_URL=https://your-app.vercel.app

# Supabase configuration (optional)
# NEXT_PUBLIC_SUPABASE_URL=https://your_project_ref.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Vercel environment variables (automatically set in production)
# VERCEL_URL=
# VERCEL_ENV=
`

  fs.writeFileSync('.env', envContent)
  console.log('✅ Updated .env file with your configuration')

  // Step 4: Test local connection
  console.log('\n🔌 STEP 4: Test Database Connection')
  console.log('=' .repeat(50))
  
  const testConnection = await askQuestion('Do you want to test the database connection locally? (y/n): ')
  
  if (testConnection.toLowerCase() === 'y') {
    try {
      console.log('Installing dependencies...')
      execSync('npm install', { stdio: 'inherit' })
      
      console.log('Running database migrations...')
      execSync('npm run migrate', { stdio: 'inherit' })
      
      console.log('✅ Database connection successful!')
    } catch (error) {
      console.log('❌ Database connection failed:', error.message)
      console.log('Please check your connection string and try again.')
      
      const continueAnyway = await askQuestion('Do you want to continue with deployment anyway? (y/n): ')
      if (continueAnyway.toLowerCase() !== 'y') {
        rl.close()
        return
      }
    }
  }

  // Step 5: Vercel Setup
  console.log('\n⚡ STEP 5: Vercel Deployment')
  console.log('=' .repeat(50))
  
  const hasVercel = await askQuestion('Do you have Vercel CLI installed? (y/n): ')
  
  if (hasVercel.toLowerCase() !== 'y') {
    console.log('Installing Vercel CLI...')
    try {
      execSync('npm install -g vercel', { stdio: 'inherit' })
      console.log('✅ Vercel CLI installed')
    } catch (error) {
      console.log('❌ Failed to install Vercel CLI. Please install manually: npm install -g vercel')
      rl.close()
      return
    }
  }

  const deployNow = await askQuestion('Do you want to deploy to Vercel now? (y/n): ')
  
  if (deployNow.toLowerCase() === 'y') {
    try {
      console.log('Logging in to Vercel...')
      execSync('vercel login', { stdio: 'inherit' })
      
      console.log('Setting up Vercel project...')
      execSync('vercel', { stdio: 'inherit' })
      
      console.log('Deploying to production...')
      execSync('vercel --prod', { stdio: 'inherit' })
      
      console.log('✅ Deployment completed!')
      
      // Get the deployment URL
      const deploymentUrl = await askQuestion('What is your Vercel deployment URL? (e.g., https://your-app.vercel.app): ')
      
      if (deploymentUrl) {
        // Update .env with production URL
        const updatedEnvContent = envContent.replace(
          '# NEXT_PUBLIC_PAYLOAD_URL=https://your-app.vercel.app',
          `NEXT_PUBLIC_PAYLOAD_URL=${deploymentUrl}`
        )
        fs.writeFileSync('.env', updatedEnvContent)
        console.log('✅ Updated .env with production URL')
      }
      
    } catch (error) {
      console.log('❌ Deployment failed:', error.message)
    }
  }

  // Step 6: Environment Variables in Vercel
  console.log('\n🔧 STEP 6: Configure Vercel Environment Variables')
  console.log('=' .repeat(50))
  console.log('You need to set these environment variables in your Vercel dashboard:')
  console.log(`DATABASE_URI=${databaseUri}`)
  console.log(`PAYLOAD_SECRET=${payloadSecret}`)
  console.log('NEXT_PUBLIC_PAYLOAD_URL=https://your-app.vercel.app')
  console.log('\nSteps:')
  console.log('1. Go to your Vercel dashboard')
  console.log('2. Select your project')
  console.log('3. Go to Settings > Environment Variables')
  console.log('4. Add each variable above')
  console.log('5. Redeploy your project')

  const envVarsSet = await askQuestion('Have you set the environment variables in Vercel? (y/n): ')

  // Step 7: Production Migrations
  if (envVarsSet.toLowerCase() === 'y') {
    console.log('\n🗄️  STEP 7: Run Production Migrations')
    console.log('=' .repeat(50))
    console.log('You need to run database migrations in production.')
    console.log('This can be done by:')
    console.log('1. Using Vercel CLI with production environment')
    console.log('2. Creating a migration API endpoint (recommended)')
    console.log('3. Running migrations locally with production DATABASE_URI')
    
    const migrationMethod = await askQuestion('Which method do you prefer? (1/2/3): ')
    
    if (migrationMethod === '3') {
      const runMigrations = await askQuestion('Do you want to run migrations now with your production database? (y/n): ')
      if (runMigrations.toLowerCase() === 'y') {
        try {
          execSync('npm run migrate', { stdio: 'inherit' })
          console.log('✅ Production migrations completed!')
        } catch (error) {
          console.log('❌ Migration failed:', error.message)
        }
      }
    }
  }

  // Final Steps
  console.log('\n🎉 SETUP COMPLETE!')
  console.log('=' .repeat(50))
  console.log('Your CMS should now be deployed and ready to use!')
  console.log('\nNext steps:')
  console.log('1. Visit your Vercel URL + /admin')
  console.log('2. Create your first admin user')
  console.log('3. Test the CMS functionality')
  console.log('4. Upload some media to test the media system')
  
  const openAdmin = await askQuestion('Do you want to open the admin interface now? (y/n): ')
  if (openAdmin.toLowerCase() === 'y') {
    const adminUrl = await askQuestion('Enter your admin URL (e.g., https://your-app.vercel.app/admin): ')
    if (adminUrl) {
      console.log(`Opening ${adminUrl}...`)
      // On Windows, use 'start', on macOS use 'open', on Linux use 'xdg-open'
      try {
        execSync(`start ${adminUrl}`, { stdio: 'inherit' })
      } catch (error) {
        console.log(`Please manually open: ${adminUrl}`)
      }
    }
  }

  rl.close()
}

// Run the interactive setup
interactiveSetup().catch(console.error)