import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  admin: {
    description: 'Manage mission and vision content with rich text formatting',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'mission',
      type: 'richText',
      required: true,
      admin: {
        description: 'Mission statement with full rich text formatting capabilities',
      },
    },
    {
      name: 'vision',
      type: 'richText',
      required: true,
      admin: {
        description: 'Vision statement with full rich text formatting capabilities',
      },
    },
  ],
}