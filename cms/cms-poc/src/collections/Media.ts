import type { CollectionConfig } from 'payload'
import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // Configure local file storage with static URL and directory settings (Requirement 5.2)
    staticDir: path.resolve(process.cwd(), 'media'),
    
    // Configure admin thumbnail display for uploaded images (Requirement 5.4)
    adminThumbnail: ({ doc }) => {
      if (doc && typeof doc === 'object' && 'sizes' in doc && doc.sizes && typeof doc.sizes === 'object' && 'thumbnail' in doc.sizes) {
        const thumbnail = doc.sizes.thumbnail as any
        if (thumbnail?.url) {
          return thumbnail.url
        }
      }
      return (doc as any)?.url || null
    },
    
    // Set up automatic image resizing for card format (600x400) (Requirement 5.3)
    imageSizes: [
      {
        name: 'thumbnail',
        width: 150,
        height: 150,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
      {
        name: 'card',
        width: 600,
        height: 400,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
      {
        name: 'medium',
        width: 800,
        height: 600,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
    ],
    
    // Configure file type restrictions for security
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  },
}
