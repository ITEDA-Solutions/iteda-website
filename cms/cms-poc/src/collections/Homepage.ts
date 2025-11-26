import type { CollectionConfig } from 'payload'

export const Homepage: CollectionConfig = {
  slug: 'homepage',
  admin: {
    useAsTitle: 'sectionType',
    defaultColumns: ['sectionType', 'order', 'updatedAt'],
    description: 'Manage homepage sections with configurable content and ordering',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'sectionType',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Hero Section',
          value: 'hero',
        },
        {
          label: 'About Section',
          value: 'about',
        },
        {
          label: 'Call to Action',
          value: 'cta',
        },
      ],
      admin: {
        description: 'Select the type of homepage section',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Rich text content for this homepage section',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      min: 1,
      admin: {
        description: 'Numerical order for section display sequence (1 = first, 2 = second, etc.)',
        step: 1,
      },
    },
  ],
}