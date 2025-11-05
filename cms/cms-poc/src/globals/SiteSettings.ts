import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    description: 'Manage site-wide settings including contact information and social media links',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
      admin: {
        description: 'Primary contact email address for the site',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      required: false,
      admin: {
        description: 'Social media platform links',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Facebook',
              value: 'facebook',
            },
            {
              label: 'Twitter',
              value: 'twitter',
            },
            {
              label: 'Instagram',
              value: 'instagram',
            },
            {
              label: 'LinkedIn',
              value: 'linkedin',
            },
            {
              label: 'YouTube',
              value: 'youtube',
            },
            {
              label: 'TikTok',
              value: 'tiktok',
            },
            {
              label: 'GitHub',
              value: 'github',
            },
          ],
          admin: {
            description: 'Select the social media platform',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          validate: (value: unknown) => {
            if (!value || typeof value !== 'string') return 'URL is required'
            
            // Basic URL validation
            try {
              new URL(value)
              return true
            } catch {
              return 'Please enter a valid URL'
            }
          },
          admin: {
            description: 'Full URL to the social media profile',
            placeholder: 'https://example.com/profile',
          },
        },
      ],
    },
  ],
}