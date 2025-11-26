import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('Media Collection Integration', () => {
  const baseURL = 'http://localhost:3000'
  
  beforeAll(async () => {
    // Wait for server to be ready
    let retries = 10
    while (retries > 0) {
      try {
        const response = await fetch(`${baseURL}/api/media`)
        if (response.ok) break
      } catch (error) {
        // Server not ready yet
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      retries--
    }
  })

  it('should have media collection API endpoint accessible', async () => {
    const response = await fetch(`${baseURL}/api/media`)
    expect(response.ok).toBe(true)
    
    const data = await response.json()
    expect(data).toHaveProperty('docs')
    expect(data).toHaveProperty('totalDocs')
    expect(Array.isArray(data.docs)).toBe(true)
  })

  it('should have media storage directory configured', () => {
    const mediaDir = path.resolve(process.cwd(), 'media')
    expect(fs.existsSync(mediaDir)).toBe(true)
  })

  it('should have proper media collection configuration', () => {
    const mediaConfigPath = path.resolve(process.cwd(), 'src/collections/Media.ts')
    expect(fs.existsSync(mediaConfigPath)).toBe(true)
    
    const mediaConfig = fs.readFileSync(mediaConfigPath, 'utf8')
    
    // Verify upload configuration (Requirement 5.1)
    expect(mediaConfig).toContain('upload: {')
    
    // Verify static directory and URL settings (Requirement 5.2)
    expect(mediaConfig).toContain('staticDir:')
    expect(mediaConfig).toContain('staticURL:')
    
    // Verify card format image sizing (Requirement 5.3)
    expect(mediaConfig).toContain('name: \'card\'')
    expect(mediaConfig).toContain('width: 600')
    expect(mediaConfig).toContain('height: 400')
    
    // Verify admin thumbnail configuration (Requirement 5.4)
    expect(mediaConfig).toContain('adminThumbnail:')
    
    // Verify image sizes configuration (Requirement 5.5)
    expect(mediaConfig).toContain('imageSizes:')
    expect(mediaConfig).toContain('mimeTypes:')
  })

  it('should return proper API response structure', async () => {
    const response = await fetch(`${baseURL}/api/media`)
    const data = await response.json()
    
    // Verify API response structure for media collection
    expect(data).toHaveProperty('docs')
    expect(data).toHaveProperty('totalDocs')
    expect(data).toHaveProperty('limit')
    expect(data).toHaveProperty('totalPages')
    expect(data).toHaveProperty('page')
    expect(data).toHaveProperty('pagingCounter')
    expect(data).toHaveProperty('hasPrevPage')
    expect(data).toHaveProperty('hasNextPage')
  })

  it('should have media collection properly imported in payload config', () => {
    const payloadConfigPath = path.resolve(process.cwd(), 'src/payload.config.ts')
    expect(fs.existsSync(payloadConfigPath)).toBe(true)
    
    const payloadConfig = fs.readFileSync(payloadConfigPath, 'utf8')
    expect(payloadConfig).toContain('import { Media }')
    expect(payloadConfig).toContain('collections: [Users, Media,')
  })
})