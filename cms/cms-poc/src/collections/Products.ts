import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'icon', 'updatedAt'],
    description: 'Manage detailed product pages with images, features, and specifications',
  },
  access: {
    read: () => true,
    create: () => true, // Allow creation without auth for local development
    update: () => true,
    delete: () => true,
  },
  fields: [
    // Basic Information
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Product name (required)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly slug (e.g., smart-solar-crop-dryer)',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      admin: {
        description: 'Short tagline or subtitle',
      },
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Sun (Solar)', value: 'sun' },
        { label: 'Credit Card (Payment)', value: 'credit-card' },
        { label: 'Smartphone (IoT)', value: 'smartphone' },
        { label: 'Leaf (Agriculture)', value: 'leaf' },
        { label: 'Zap (Energy)', value: 'zap' },
      ],
      admin: {
        description: 'Icon to display for this product',
      },
    },
    
    // Overview
    {
      name: 'overview',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Detailed product overview (required)',
      },
    },
    
    // Images
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Main product image',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Image Gallery',
      admin: {
        description: 'Additional product images for gallery',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          admin: {
            description: 'Optional image caption',
          },
        },
      ],
    },
    
    // Features
    {
      name: 'features',
      type: 'array',
      label: 'Key Features',
      required: true,
      admin: {
        description: 'List of key product features',
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    
    // Technical Specifications
    {
      name: 'specifications',
      type: 'array',
      label: 'Technical Specifications',
      admin: {
        description: 'Product specifications (key-value pairs)',
      },
      fields: [
        {
          name: 'spec',
          type: 'text',
          label: 'Specification Name',
          required: true,
          admin: {
            description: 'e.g., "Power Source" or "Capacity"',
          },
        },
        {
          name: 'value',
          type: 'text',
          label: 'Specification Value',
          required: true,
          admin: {
            description: 'e.g., "Solar panels (300W)" or "100-500kg"',
          },
        },
      ],
    },
    
    // Use Cases
    {
      name: 'useCases',
      type: 'array',
      label: 'Use Cases',
      admin: {
        description: 'List of common use cases',
      },
      fields: [
        {
          name: 'useCase',
          type: 'text',
          required: true,
        },
      ],
    },
    
    // Call to Action
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
      defaultValue: 'Request Demo',
      admin: {
        description: 'Text for the main call-to-action button',
      },
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'CTA Link',
      defaultValue: '/#contact',
      admin: {
        description: 'URL for the main call-to-action button',
      },
    },
    
    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'Custom meta title (optional, defaults to product name)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'Custom meta description (optional, defaults to overview)',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Open Graph image for social sharing',
          },
        },
      ],
    },
    
    // Legacy fields for backward compatibility
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Short description (legacy field)',
        condition: () => false, // Hide in admin
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Product image (legacy field)',
        condition: () => false, // Hide in admin
      },
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'External link (legacy field)',
        condition: () => false, // Hide in admin
      },
    },
  ],
}