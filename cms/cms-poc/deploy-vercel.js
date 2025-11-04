import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

async function deployToVercel() {
  console.log('🚀 Deploying CMS to Vercel...\n')

  // Check if vercel.json exists
  if (!fs.existsSync('vercel.json')) {
    console.log('❌ vercel.json not found')
    return false
  }

  console.log('✅ Vercel configuration found')

  // Check if .env file exists
  if (!fs.existsSync('.env')) {
    console.log('⚠️  .env file not found')
    console.log('💡 Make sure to set environment variables in Vercel dashboard')
  } else {
    console.log('✅ Environment file found')
  }

  try {
    console.log('📦 Installing Vercel CLI...')
    execSync('npm install -g vercel', { stdio: 'inherit' })

    console.log('🔐 Logging in to Vercel...')
    execSync('vercel login', { stdio: 'inherit' })

    console.log('⚙️  Setting up Vercel project...')
    execSync('vercel', { stdio: 'inherit' })

    console.log('🌍 Deploying to production...')
    execSync('vercel --prod', { stdio: 'inherit' })

    console.log('\n🎉 Deployment completed!')
    console.log('\n📋 Post-deployment checklist:')
    console.log('   1. Set environment variables in Vercel dashboard:')
    console.log('      - PAYLOAD_SECRET')
    console.log('      - DATABASE_URI (Supabase PostgreSQL connection)')
    console.log('      - NEXT_PUBLIC_PAYLOAD_URL (your Vercel domain)')
    console.log('   2. Run database migrations in production')
    console.log('   3. Create admin user via /admin')
    console.log('   4. Test media upload functionality')

  } catch (error) {
    console.error('❌ Deployment failed:', error.message)
    return false
  }

  return true
}

// Run deployment
deployToVercel().catch(console.error)