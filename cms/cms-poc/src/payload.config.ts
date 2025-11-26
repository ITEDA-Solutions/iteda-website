// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Homepage } from './collections/Homepage'
import { Products } from './collections/Products'
import { About } from './globals/About'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Homepage, Products],
  globals: [About, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  // Vercel-specific configuration
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001',
  cors: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://iteda-website.vercel.app', // Production frontend
    'https://iteda-website-*.vercel.app', // Preview deployments
    process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001',
    // Add your Vercel domain here
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ],
  csrf: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://iteda-website.vercel.app', // Production frontend
    'https://iteda-website-*.vercel.app', // Preview deployments
    process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001',
    // Add your Vercel domain here
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ],
})
