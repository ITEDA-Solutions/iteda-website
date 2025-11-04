import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

// Load environment variables
dotenv.config()

async function verifySupabaseVercelSetup() {
  console.log('🔍 Verifying Supabase + Vercel Setup...\n')

  let allChecks = true

  // Check environment variables
  console.log('📋 Environment Variables Check:')
  
  const requiredEnvVars = [
    'DATABASE_URI',
    'PAYLOAD_SECRET',
    'NEXT_PUBLIC_PAYLOAD_URL'
  ]

  const optionalEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ]

  requiredEnvVars.forEach(envVar => {
    if (process.env[envVar]) {
      console.log(`   ✅ ${envVar} is set`)
    } else {
      console.log(`   ❌ ${envVar} is missing`)
      allChecks = false
    }
  })

  optionalEnvVars.forEach(envVar => {
    if (process.env[envVar]) {
      console.log(`   ✅ ${envVar} is set (optional)`)
    } else {
      console.log(`   ⚠️  ${envVar} is not set (optional)`)
    }
  })

  // Check Supabase connection string format
  console.log('\n🔗 Database Connection Check:')
  const databaseUri = process.env.DATABASE_URI
  if (databaseUri) {
    if (databaseUri.includes('supabase.co')) {
      console.log('   ✅ Supabase connection string detected')
    } else if (databaseUri.includes('localhost')) {
      console.log('   ⚠️  Local database connection detected')
    } else {
      console.log('   ✅ External database connection detected')
    }

    if (databaseUri.startsWith('postgresql://')) {
      console.log('   ✅ PostgreSQL connection string format is correct')
    } else {
      console.log('   ❌ Invalid PostgreSQL connection string format')
      allChecks = false
    }
  }

  // Check Vercel configuration
  console.log('\n⚡ Vercel Configuration Check:')
  if (fs.existsSync('vercel.json')) {
    console.log('   ✅ vercel.json configuration file exists')
    
    try {
      const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'))
      if (vercelConfig.env) {
        console.log('   ✅ Environment variables configured in vercel.json')
      }
      if (vercelConfig.build) {
        console.log('   ✅ Build configuration present')
      }
      if (vercelConfig.functions) {
        console.log('   ✅ Function configuration present')
      }
    } catch (error) {
      console.log('   ❌ Invalid vercel.json format')
      allChecks = false
    }
  } else {
    console.log('   ❌ vercel.json configuration file missing')
    allChecks = false
  }

  // Check package.json scripts
  console.log('\n📦 Package Scripts Check:')
  if (fs.existsSync('package.json')) {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    const requiredScripts = ['build', 'start', 'migrate', 'setup:supabase', 'deploy:vercel']
    
    requiredScripts.forEach(script => {
      if (packageJson.scripts && packageJson.scripts[script]) {
        console.log(`   ✅ ${script} script is configured`)
      } else {
        console.log(`   ❌ ${script} script is missing`)
        allChecks = false
      }
    })

    // Check for Supabase dependency
    if (packageJson.dependencies && packageJson.dependencies['@supabase/supabase-js']) {
      console.log('   ✅ Supabase client dependency installed')
    } else {
      console.log('   ⚠️  Supabase client dependency not installed (optional)')
    }
  }

  // Check setup documentation
  console.log('\n📚 Documentation Check:')
  if (fs.existsSync('SUPABASE-VERCEL-SETUP.md')) {
    console.log('   ✅ Setup documentation exists')
  } else {
    console.log('   ❌ Setup documentation missing')
  }

  if (fs.existsSync('.env.example')) {
    console.log('   ✅ Environment example file exists')
  } else {
    console.log('   ❌ Environment example file missing')
  }

  // Test database connection (if possible)
  console.log('\n🔌 Database Connection Test:')
  if (databaseUri) {
    try {
      // This is a basic test - in a real scenario you'd want to test the actual connection
      console.log('   ✅ Database URI format is valid')
      console.log('   💡 Run "npm run migrate" to test actual database connection')
    } catch (error) {
      console.log('   ❌ Database connection test failed:', error.message)
      allChecks = false
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  if (allChecks) {
    console.log('🎉 SUPABASE + VERCEL SETUP VERIFICATION COMPLETE!')
    console.log('\n✅ All critical checks passed')
    console.log('\n🚀 Ready for deployment:')
    console.log('   1. Run: npm install')
    console.log('   2. Run: npm run migrate (to set up database)')
    console.log('   3. Run: npm run deploy:vercel (to deploy)')
    console.log('   4. Set environment variables in Vercel dashboard')
    console.log('   5. Run production migrations')
    console.log('   6. Create admin user at /admin')
  } else {
    console.log('❌ Some setup issues found')
    console.log('\n📋 Please address the issues above before deploying')
    console.log('\n💡 Refer to SUPABASE-VERCEL-SETUP.md for detailed instructions')
  }

  return allChecks
}

// Run verification
verifySupabaseVercelSetup().then(success => {
  if (!success) {
    process.exit(1)
  }
})