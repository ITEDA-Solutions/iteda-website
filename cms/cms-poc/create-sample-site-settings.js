import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

async function createSampleSiteSettings() {
  try {
    console.log('🚀 Creating sample site settings data...')
    
    const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
    const apiUrl = `${baseUrl}/api/globals/site-settings`
    
    const sampleData = {
      contactEmail: 'contact@example.com',
      socialLinks: [
        {
          platform: 'facebook',
          url: 'https://facebook.com/example'
        },
        {
          platform: 'twitter',
          url: 'https://twitter.com/example'
        },
        {
          platform: 'linkedin',
          url: 'https://linkedin.com/company/example'
        },
        {
          platform: 'github',
          url: 'https://github.com/example'
        }
      ]
    }

    console.log('📝 Sample data to create:', JSON.stringify(sampleData, null, 2))
    
    // Note: This would require authentication in a real scenario
    // For now, we'll just show the structure and recommend manual creation
    console.log('\n💡 To create this data manually:')
    console.log(`   1. Go to ${baseUrl}/admin`)
    console.log('   2. Navigate to Globals > Site Settings')
    console.log('   3. Fill in the contact email: contact@example.com')
    console.log('   4. Add social links:')
    sampleData.socialLinks.forEach((link, index) => {
      console.log(`      ${index + 1}. Platform: ${link.platform}, URL: ${link.url}`)
    })
    console.log('   5. Save the settings')
    
    // Test reading the data (if it exists)
    console.log('\n📖 Testing API endpoint...')
    const response = await fetch(apiUrl)
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Site settings data retrieved successfully:')
      console.log(JSON.stringify(data, null, 2))
      
      // Verify structure
      if (data.contactEmail) {
        console.log('✅ Contact email field present:', data.contactEmail)
      }
      
      if (data.socialLinks && Array.isArray(data.socialLinks)) {
        console.log('✅ Social links array present with', data.socialLinks.length, 'items')
      }
    } else {
      console.log('⚠️  No site settings data found yet - create it through the admin interface')
    }

    console.log('\n🎉 Sample site settings creation guide completed!')
    
  } catch (error) {
    console.error('❌ Error creating sample site settings:', error.message)
    console.log('\n💡 Make sure the development server is running with: npm run dev')
  }
}

createSampleSiteSettings()