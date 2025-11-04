/**
 * Script to create sample mission and vision content for the About global
 * This tests the rich text functionality and data persistence
 */

import fetch from 'node-fetch';

const PAYLOAD_URL = 'http://localhost:3000';

// Sample rich text content with formatting
const sampleMissionContent = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 1, // Bold
            mode: "normal",
            style: "",
            text: "Our Mission",
            type: "text",
            version: 1
          }
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "heading",
        version: 1,
        tag: "h2"
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "To empower businesses and individuals through innovative technology solutions that drive growth, efficiency, and success. We are committed to delivering ",
            type: "text",
            version: 1
          },
          {
            detail: 0,
            format: 2, // Italic
            mode: "normal",
            style: "",
            text: "exceptional value",
            type: "text",
            version: 1
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: " through cutting-edge software development, strategic consulting, and personalized support.",
            type: "text",
            version: 1
          }
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1
      }
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1
  }
};

const sampleVisionContent = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 1, // Bold
            mode: "normal",
            style: "",
            text: "Our Vision",
            type: "text",
            version: 1
          }
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "heading",
        version: 1,
        tag: "h2"
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "To be the ",
            type: "text",
            version: 1
          },
          {
            detail: 0,
            format: 3, // Bold + Italic
            mode: "normal",
            style: "",
            text: "leading technology partner",
            type: "text",
            version: 1
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: " that transforms ideas into reality, fostering innovation and creating lasting impact in the digital landscape. We envision a future where technology seamlessly integrates with human potential to unlock unlimited possibilities.",
            type: "text",
            version: 1
          }
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1
      }
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1
  }
};

async function createSampleAboutContent() {
  console.log('📝 Creating sample About global content...\n');

  try {
    // First, let's get the current About global data to see the structure
    console.log('1. Checking current About global structure...');
    const getResponse = await fetch(`${PAYLOAD_URL}/api/globals/about`);
    
    if (!getResponse.ok) {
      console.log(`⚠️  Could not fetch About global: ${getResponse.status}`);
    } else {
      const currentData = await getResponse.json();
      console.log('✅ Current About global structure:', JSON.stringify(currentData, null, 2));
    }

    // Update the About global with sample content
    console.log('\n2. Updating About global with sample content...');
    
    const updateData = {
      mission: sampleMissionContent,
      vision: sampleVisionContent
    };

    const updateResponse = await fetch(`${PAYLOAD_URL}/api/globals/about`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });

    if (updateResponse.ok) {
      const updatedData = await updateResponse.json();
      console.log('✅ Successfully updated About global with sample content');
      console.log('📋 Updated data structure:', JSON.stringify(updatedData, null, 2));
    } else {
      const errorText = await updateResponse.text();
      console.log(`❌ Failed to update About global: ${updateResponse.status}`);
      console.log('Error details:', errorText);
    }

    // Verify the content was saved correctly
    console.log('\n3. Verifying content persistence...');
    const verifyResponse = await fetch(`${PAYLOAD_URL}/api/globals/about`);
    
    if (verifyResponse.ok) {
      const verifiedData = await verifyResponse.json();
      console.log('✅ Content verification successful');
      
      if (verifiedData.mission && verifiedData.vision) {
        console.log('✅ Both mission and vision content are persisted');
        console.log('🎉 Rich text formatting is working correctly');
      } else {
        console.log('⚠️  Some content may not have been saved properly');
      }
    } else {
      console.log('❌ Could not verify content persistence');
    }

    console.log('\n🎉 Sample content creation completed!');
    console.log('\n📝 Next steps:');
    console.log('   1. Visit http://localhost:3000/admin/globals/about to see the content');
    console.log('   2. Edit the content to test rich text formatting capabilities');
    console.log('   3. Test the API endpoint: http://localhost:3000/api/globals/about');

  } catch (error) {
    console.error('❌ Error creating sample content:', error.message);
    return false;
  }
}

// Run the script
createSampleAboutContent();