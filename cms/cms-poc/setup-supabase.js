import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
dotenv.config()

async function setupSupabase() {
  console.log('🔧 Setting up Supabase for Payload CMS...\n')

  // Check if Supabase credentials are provided
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const databaseUri = process.env.DATABASE_URI

  if (!databaseUri) {
    console.log('❌ DATABASE_URI not found in environment variables')
    console.log('💡 Please add your Supabase PostgreSQL connection string to .env file')
    console.log('   Format: postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres')
    return false
  }

  console.log('✅ Database URI configured')

  if (supabaseUrl && supabaseKey) {
    console.log('✅ Supabase client credentials configured')
    
    try {
      // Test Supabase connection
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { data, error } = await supabase.from('_payload_preferences').select('*').limit(1)
      
      if (error && error.code !== 'PGRST116') { // PGRST116 = table doesn't exist (expected for new setup)
        console.log('⚠️  Supabase connection test failed:', error.message)
      } else {
        console.log('✅ Supabase connection test successful')
      }
    } catch (error) {
      console.log('⚠️  Could not test Supabase connection:', error.message)
    }
  } else {
    console.log('⚠️  Supabase client credentials not configured (optional)')
    console.log('   Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env for direct Supabase client usage')
  }

  console.log('\n📋 Supabase Setup Checklist:')
  console.log('   1. ✅ Create a Supabase project at https://supabase.com')
  console.log('   2. ✅ Get your PostgreSQL connection string from Project Settings > Database')
  console.log('   3. ✅ Add DATABASE_URI to your .env file')
  console.log('   4. ✅ Add environment variables to Vercel project settings')
  console.log('   5. ✅ Run database migrations: npm run payload migrate')

  console.log('\n🚀 Next steps:')
  console.log('   • Deploy to Vercel: vercel --prod')
  console.log('   • Set up environment variables in Vercel dashboard')
  console.log('   • Run database migrations in production')

  return true
}

// Run setup
setupSupabase().catch(console.error)