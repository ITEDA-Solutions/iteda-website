#!/usr/bin/env node

/**
 * Create Detailed Product Pages
 * Populates CMS with Smart Solar Crop Dryer and bridGe Payment Add-on
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';

console.log('🚀 Creating Detailed Product Pages\n');

const products = [
  {
    name: 'Smart Solar Crop Dryer',
    slug: 'smart-solar-crop-dryer',
    tagline: 'Sustainable, Solar-Powered Crop Preservation',
    icon: 'sun',
    overview: 'Our Smart Solar Crop Dryer is a revolutionary IoT-enabled system that uses solar energy to dry crops efficiently, reducing post-harvest losses and ensuring consistent quality. Perfect for small to medium-sized farms looking to improve their post-harvest processing while reducing costs and environmental impact.',
    features: [
      { feature: '100% solar-powered operation - zero electricity costs' },
      { feature: 'Real-time temperature and humidity monitoring' },
      { feature: 'Automated climate control system' },
      { feature: 'Mobile app for remote monitoring and alerts' },
      { feature: 'Weather-resistant design for outdoor use' },
      { feature: 'Capacity: 100-500kg per batch' },
      { feature: 'Reduces drying time by 40% compared to traditional methods' },
      { feature: 'Maintains optimal moisture levels (10-12%)' },
    ],
    specifications: [
      { spec: 'Power Source', value: 'Solar panels (300W)' },
      { spec: 'Drying Capacity', value: '100-500kg per batch' },
      { spec: 'Drying Time', value: '24-48 hours (weather dependent)' },
      { spec: 'Temperature Range', value: '40-65°C' },
      { spec: 'Humidity Control', value: 'Automated ventilation system' },
      { spec: 'Connectivity', value: '4G/WiFi IoT module' },
      { spec: 'Dimensions', value: '3m x 2m x 2.5m' },
      { spec: 'Warranty', value: '2 years manufacturer warranty' },
    ],
    useCases: [
      { useCase: 'Grain drying (maize, rice, wheat)' },
      { useCase: 'Fruit preservation (mangoes, bananas, pineapples)' },
      { useCase: 'Vegetable drying' },
      { useCase: 'Coffee bean processing' },
      { useCase: 'Herb and spice drying' },
    ],
    ctaText: 'Request Demo',
    ctaLink: '/#contact',
    seo: {
      metaTitle: 'Smart Solar Crop Dryer - IoT-Enabled Agricultural Solution | ITEDA',
      metaDescription: 'Revolutionary solar-powered crop dryer with IoT monitoring. Reduce post-harvest losses by 40% while eliminating electricity costs. Perfect for farms of all sizes.',
    },
  },
  {
    name: 'bridGe Payment Add-on',
    slug: 'bridge-payment-addon',
    tagline: 'Seamless Payments for Google Forms',
    icon: 'credit-card',
    overview: 'bridGe is a powerful Google Forms add-on that enables secure payment collection directly within your forms. Perfect for agricultural equipment rentals, product sales, and service bookings. Accept M-Pesa, card payments, and bank transfers without any coding required.',
    features: [
      { feature: 'Integrate payments into Google Forms seamlessly' },
      { feature: 'Support for M-Pesa, card payments, and bank transfers' },
      { feature: 'Automatic payment confirmation emails' },
      { feature: 'Real-time transaction tracking and notifications' },
      { feature: 'Secure PCI-DSS compliant processing' },
      { feature: 'No coding required - easy 5-minute setup' },
      { feature: 'Detailed transaction reports and analytics' },
      { feature: 'Multi-currency support (KES, USD, EUR)' },
    ],
    specifications: [
      { spec: 'Platform', value: 'Google Forms Add-on' },
      { spec: 'Payment Methods', value: 'M-Pesa, Visa, Mastercard, Bank Transfer' },
      { spec: 'Transaction Fee', value: '2.5% + KES 10 per transaction' },
      { spec: 'Settlement Time', value: 'T+1 business days' },
      { spec: 'Supported Currencies', value: 'KES, USD, EUR' },
      { spec: 'Security', value: 'PCI-DSS Level 1 compliant' },
      { spec: 'API Access', value: 'Available on Business plan' },
      { spec: 'Support', value: 'Email, Phone, Live Chat' },
    ],
    useCases: [
      { useCase: 'Agricultural equipment rental payments' },
      { useCase: 'Product order forms with integrated payment' },
      { useCase: 'Service booking with deposits' },
      { useCase: 'Event registration with fees' },
      { useCase: 'Subscription and membership collection' },
    ],
    ctaText: 'Start Free Trial',
    ctaLink: '/#contact',
    seo: {
      metaTitle: 'bridGe - Google Forms Payment Add-on | ITEDA Solutions',
      metaDescription: 'Add M-Pesa, card payments, and bank transfers to your Google Forms. Secure, PCI-compliant payment processing with no coding required. Start collecting payments today.',
    },
  },
];

async function createProducts() {
  console.log('📝 Creating products in CMS...\n');

  for (const product of products) {
    try {
      console.log(`Creating: ${product.name}...`);

      const response = await fetch(`${PAYLOAD_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Created: ${product.name} (ID: ${data.doc.id})\n`);
      } else {
        const error = await response.text();
        console.log(`❌ Failed to create ${product.name}:`);
        console.log(`   Status: ${response.status}`);
        console.log(`   Error: ${error}\n`);
      }
    } catch (error) {
      console.log(`❌ Error creating ${product.name}:`, error.message, '\n');
    }
  }

  console.log('🎉 Product creation complete!\n');
  console.log('📋 Next Steps:');
  console.log('   1. Visit http://localhost:3001/admin to view products');
  console.log('   2. Upload product images and gallery photos');
  console.log('   3. Add Open Graph images for SEO');
  console.log('   4. View products at:');
  console.log('      - http://localhost:3000/products/smart-solar-crop-dryer');
  console.log('      - http://localhost:3000/products/bridge-payment-addon');
}

createProducts().catch(console.error);
