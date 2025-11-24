/**
 * Script to create sample About content in the CMS
 */

async function createAboutContent() {
    const API_URL = 'http://localhost:3001';

    try {
        console.log('🔄 Creating/updating About content...');

        const aboutData = {
            mission: {
                root: {
                    children: [
                        {
                            type: 'paragraph',
                            children: [
                                {
                                    text: 'At ITEDA Solutions, our mission is to revolutionize sustainable agriculture through innovative IoT technology. We empower farmers with smart, solar-powered solutions that reduce energy costs, minimize post-harvest losses, and contribute to a more sustainable food system.',
                                    bold: false,
                                },
                            ],
                        },
                        {
                            type: 'paragraph',
                            children: [
                                {
                                    text: 'We are committed to making advanced agricultural technology accessible and affordable for smallholder farmers across Africa.',
                                    bold: true,
                                },
                            ],
                        },
                    ],
                },
            },
            vision: {
                root: {
                    children: [
                        {
                            type: 'paragraph',
                            children: [
                                {
                                    text: 'We envision a future where every farmer has access to cutting-edge IoT solutions that enhance productivity, reduce waste, and ensure food security. Our goal is to be the leading provider of sustainable agricultural technology in East Africa and beyond.',
                                    bold: false,
                                },
                            ],
                        },
                        {
                            type: 'paragraph',
                            children: [
                                {
                                    text: 'Through continuous innovation and partnership with farming communities, we strive to create a world where technology and agriculture work in harmony to build a sustainable future.',
                                    italic: true,
                                },
                            ],
                        },
                    ],
                },
            },
        };

        const response = await fetch(`${API_URL}/api/globals/about`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(aboutData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Error response:', errorText);
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('✅ About content created successfully!');
        console.log('📄 Content:', JSON.stringify(result, null, 2));

        return result;
    } catch (error) {
        console.error('❌ Error creating About content:', error.message);
        console.error('💡 Make sure the CMS is running on http://localhost:3001');
        console.error('💡 Run: cd cms/cms-poc && npm run dev');
        process.exit(1);
    }
}

// Run the script
createAboutContent()
    .then(() => {
        console.log('\n✨ All done! Refresh your frontend to see the changes.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
