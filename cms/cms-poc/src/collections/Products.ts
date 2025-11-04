import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'image', 'updatedAt'],
    description: 'Manage product listings with images and descriptions',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Product name (required)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Product description (optional)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Product image (optional)',
      },
    },
    {
      name: 'link',
      type: 'text',
      required: false,
      admin: {
        description: 'External link URL (optional)',
      },
    },
  ],
}