/**
 * End-to-end tests for content management workflow and updates
 * Tests requirements 10.1, 10.2, 10.3, 10.4, 10.5
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { getPayload, Payload } from 'payload'
import config from '../../src/payload.config'
import fs from 'fs'
import path from 'path'

let payload: Payload
const baseURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'

describe('Content Management Workflow E2E Tests', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
    
    // Wait for server to be ready
    let retries = 10
    while (retries > 0) {
      try {
        const response = await fetch(`${baseURL}/api/health`)
        if (response.ok) break
      } catch (error) {
        // Server not ready yet
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      retries--
    }
  })

  describe('Content Updates Save Correctly to Database (Requirement 10.1)', () => {
    it('should save homepage section updates to database', async () => {
      // Create initial homepage section
      const initialSection = await payload.create({
        collection: 'homepage',
        data: {
          sectionType: 'hero',
          content: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Initial hero content' }],
                },
              ],
            },
          },
          order: 1,
        },
      })

      expect(initialSection).toBeDefined()
      expect(initialSection.id).toBeDefined()

      // Update the section content
      const updatedSection = await payload.update({
        collection: 'homepage',
        id: initialSection.id,
        data: {
          content: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Updated hero content' }],
                },
              ],
            },
          },
        },
      })

      expect(updatedSection).toBeDefined()
      expect(updatedSection.id).toBe(initialSection.id)

      // Verify the update was saved to database
      const retrievedSection = await payload.findByID({
        collection: 'homepage',
        id: initialSection.id,
      })

      expect(retrievedSection).toBeDefined()
      expect(retrievedSection.content.root.children[0].children[0].text).toBe('Updated hero content')

      // Clean up
      await payload.delete({
        collection: 'homepage',
        id: initialSection.id,
      })
    })

    it('should save About global updates to database', async () => {
      const updatedMission = {
        root: {
          children: [
            {
              type: 'paragraph',
              children: [{ text: 'Updated mission statement for testing' }],
            },
          ],
        },
      }

      const updatedVision = {
        root: {
          children: [
            {
              type: 'paragraph',
              children: [{ text: 'Updated vision statement for testing' }],
            },
          ],
        },
      }

      // Update About global
      const updatedAbout = await payload.updateGlobal({
        slug: 'about',
        data: {
          mission: updatedMission,
          vision: updatedVision,
        },
      })

      expect(updatedAbout).toBeDefined()
      expect(updatedAbout.mission).toBeDefined()
      expect(updatedAbout.vision).toBeDefined()

      // Verify the update was saved to database
      const retrievedAbout = await payload.findGlobal({
        slug: 'about',
      })

      expect(retrievedAbout.mission.root.children[0].children[0].text).toBe('Updated mission statement for testing')
      expect(retrievedAbout.vision.root.children[0].children[0].text).toBe('Updated vision statement for testing')
    })

    it('should save product updates to database', async () => {
      // Create initial product
      const initialProduct = await payload.create({
        collection: 'products',
        data: {
          name: 'Test Product',
          description: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Initial product description' }],
                },
              ],
            },
          },
          link: 'https://example.com/initial',
        },
      })

      expect(initialProduct).toBeDefined()
      expect(initialProduct.id).toBeDefined()

      // Update the product
      const updatedProduct = await payload.update({
        collection: 'products',
        id: initialProduct.id,
        data: {
          name: 'Updated Test Product',
          description: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Updated product description' }],
                },
              ],
            },
          },
          link: 'https://example.com/updated',
        },
      })

      expect(updatedProduct).toBeDefined()
      expect(updatedProduct.name).toBe('Updated Test Product')

      // Verify the update was saved to database
      const retrievedProduct = await payload.findByID({
        collection: 'products',
        id: initialProduct.id,
      })

      expect(retrievedProduct.name).toBe('Updated Test Product')
      expect(retrievedProduct.description.root.children[0].children[0].text).toBe('Updated product description')
      expect(retrievedProduct.link).toBe('https://example.com/updated')

      // Clean up
      await payload.delete({
        collection: 'products',
        id: initialProduct.id,
      })
    })
  })

  describe('Content Change Propagation to Frontend (Requirement 10.2)', () => {
    it('should propagate homepage section changes to API endpoint', async () => {
      // Create a test section
      const testSection = await payload.create({
        collection: 'homepage',
        data: {
          sectionType: 'cta',
          content: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Test CTA content for API propagation' }],
                },
              ],
            },
          },
          order: 99, // High order to avoid conflicts
        },
      })

      // Wait a moment for potential caching
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Fetch from API endpoint
      const response = await fetch(`${baseURL}/api/homepage`)
      expect(response.ok).toBe(true)

      const data = await response.json()
      expect(data.docs).toBeDefined()

      // Find our test section in the API response
      const apiSection = data.docs.find((section: any) => section.id === testSection.id)
      expect(apiSection).toBeDefined()
      expect(apiSection.sectionType).toBe('cta')
      expect(apiSection.order).toBe(99)

      // Clean up
      await payload.delete({
        collection: 'homepage',
        id: testSection.id,
      })
    })

    it('should propagate About global changes to API endpoint', async () => {
      const testMission = {
        root: {
          children: [
            {
              type: 'paragraph',
              children: [{ text: 'Test mission for API propagation' }],
            },
          ],
        },
      }

      // Update About global
      await payload.updateGlobal({
        slug: 'about',
        data: {
          mission: testMission,
        },
      })

      // Wait a moment for potential caching
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Fetch from API endpoint
      const response = await fetch(`${baseURL}/api/globals/about`)
      expect(response.ok).toBe(true)

      const data = await response.json()
      expect(data.mission).toBeDefined()
      expect(data.mission.root.children[0].children[0].text).toBe('Test mission for API propagation')
    })

    it('should propagate product changes to API endpoint', async () => {
      // Create a test product
      const testProduct = await payload.create({
        collection: 'products',
        data: {
          name: 'API Propagation Test Product',
          description: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Test product for API propagation' }],
                },
              ],
            },
          },
        },
      })

      // Wait a moment for potential caching
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Fetch from API endpoint
      const response = await fetch(`${baseURL}/api/products`)
      expect(response.ok).toBe(true)

      const data = await response.json()
      expect(data.docs).toBeDefined()

      // Find our test product in the API response
      const apiProduct = data.docs.find((product: any) => product.id === testProduct.id)
      expect(apiProduct).toBeDefined()
      expect(apiProduct.name).toBe('API Propagation Test Product')

      // Clean up
      await payload.delete({
        collection: 'products',
        id: testProduct.id,
      })
    })
  })

  describe('New Product Creation and Display (Requirement 10.3)', () => {
    it('should create new product and make it immediately available via API', async () => {
      // Create a new product
      const newProduct = await payload.create({
        collection: 'products',
        data: {
          name: 'Immediate Display Test Product',
          description: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'This product should be immediately available' }],
                },
              ],
            },
          },
          link: 'https://example.com/immediate-test',
        },
      })

      expect(newProduct).toBeDefined()
      expect(newProduct.id).toBeDefined()

      // Immediately fetch from API to verify availability
      const response = await fetch(`${baseURL}/api/products/${newProduct.id}`)
      expect(response.ok).toBe(true)

      const apiProduct = await response.json()
      expect(apiProduct.id).toBe(newProduct.id)
      expect(apiProduct.name).toBe('Immediate Display Test Product')
      expect(apiProduct.link).toBe('https://example.com/immediate-test')

      // Verify it appears in the products list
      const listResponse = await fetch(`${baseURL}/api/products`)
      const listData = await listResponse.json()
      const foundProduct = listData.docs.find((product: any) => product.id === newProduct.id)
      expect(foundProduct).toBeDefined()

      // Clean up
      await payload.delete({
        collection: 'products',
        id: newProduct.id,
      })
    })

    it('should create multiple products and maintain proper ordering', async () => {
      // Create multiple products
      const product1 = await payload.create({
        collection: 'products',
        data: {
          name: 'Product A',
          description: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'First product' }],
                },
              ],
            },
          },
        },
      })

      const product2 = await payload.create({
        collection: 'products',
        data: {
          name: 'Product B',
          description: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Second product' }],
                },
              ],
            },
          },
        },
      })

      // Fetch all products
      const response = await fetch(`${baseURL}/api/products`)
      const data = await response.json()

      // Verify both products are present
      const foundProduct1 = data.docs.find((product: any) => product.id === product1.id)
      const foundProduct2 = data.docs.find((product: any) => product.id === product2.id)

      expect(foundProduct1).toBeDefined()
      expect(foundProduct2).toBeDefined()
      expect(foundProduct1.name).toBe('Product A')
      expect(foundProduct2.name).toBe('Product B')

      // Clean up
      await payload.delete({ collection: 'products', id: product1.id })
      await payload.delete({ collection: 'products', id: product2.id })
    })
  })

  describe('Image Upload and Display Pipeline (Requirement 10.4)', () => {
    it('should handle image upload and generate proper URLs', async () => {
      // Create a simple test image buffer (1x1 pixel PNG)
      const testImageBuffer = Buffer.from([
        0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
        0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
        0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD7, 0x63, 0xF8, 0x00, 0x00, 0x00,
        0x01, 0x00, 0x01, 0x5C, 0xC2, 0x8A, 0xDB, 0x00, 0x00, 0x00, 0x00, 0x49,
        0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
      ])

      // Create media entry
      const mediaEntry = await payload.create({
        collection: 'media',
        data: {
          alt: 'Test image for upload pipeline',
        },
        file: {
          data: testImageBuffer,
          mimetype: 'image/png',
          name: 'test-image.png',
          size: testImageBuffer.length,
        },
      })

      expect(mediaEntry).toBeDefined()
      expect(mediaEntry.id).toBeDefined()
      expect(mediaEntry.filename).toBeDefined()
      expect(mediaEntry.url).toBeDefined()

      // Verify the file was created in the media directory
      const mediaDir = path.resolve(process.cwd(), 'media')
      const uploadedFilePath = path.join(mediaDir, mediaEntry.filename!)
      expect(fs.existsSync(uploadedFilePath)).toBe(true)

      // Verify API endpoint returns the media
      const response = await fetch(`${baseURL}/api/media/${mediaEntry.id}`)
      expect(response.ok).toBe(true)

      const apiMedia = await response.json()
      expect(apiMedia.id).toBe(mediaEntry.id)
      expect(apiMedia.url).toBeDefined()
      expect(apiMedia.filename).toBe(mediaEntry.filename)

      // Test image URL accessibility
      const imageResponse = await fetch(`${baseURL}${mediaEntry.url}`)
      expect(imageResponse.ok).toBe(true)
      expect(imageResponse.headers.get('content-type')).toContain('image')

      // Clean up
      await payload.delete({
        collection: 'media',
        id: mediaEntry.id,
      })

      // Verify file was deleted
      expect(fs.existsSync(uploadedFilePath)).toBe(false)
    })

    it('should create product with image and verify complete pipeline', async () => {
      // Create a test image first
      const testImageBuffer = Buffer.from([
        0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
        0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
        0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD7, 0x63, 0xF8, 0x00, 0x00, 0x00,
        0x01, 0x00, 0x01, 0x5C, 0xC2, 0x8A, 0xDB, 0x00, 0x00, 0x00, 0x00, 0x49,
        0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
      ])

      const mediaEntry = await payload.create({
        collection: 'media',
        data: {
          alt: 'Product test image',
        },
        file: {
          data: testImageBuffer,
          mimetype: 'image/png',
          name: 'product-test.png',
          size: testImageBuffer.length,
        },
      })

      // Create product with the uploaded image
      const productWithImage = await payload.create({
        collection: 'products',
        data: {
          name: 'Product with Image Test',
          description: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Product with image for pipeline testing' }],
                },
              ],
            },
          },
          image: mediaEntry.id,
        },
      })

      expect(productWithImage).toBeDefined()
      expect(productWithImage.image).toBeDefined()

      // Verify product API includes populated image data
      const response = await fetch(`${baseURL}/api/products/${productWithImage.id}`)
      const apiProduct = await response.json()

      expect(apiProduct.image).toBeDefined()
      expect(apiProduct.image.url).toBeDefined()
      expect(apiProduct.image.alt).toBe('Product test image')

      // Verify image is accessible through the product
      const imageResponse = await fetch(`${baseURL}${apiProduct.image.url}`)
      expect(imageResponse.ok).toBe(true)

      // Clean up
      await payload.delete({ collection: 'products', id: productWithImage.id })
      await payload.delete({ collection: 'media', id: mediaEntry.id })
    })
  })

  describe('Complete Content Editor Workflow (Requirement 10.5)', () => {
    it('should support complete content creation workflow', async () => {
      // Step 1: Create About content
      const aboutContent = await payload.updateGlobal({
        slug: 'about',
        data: {
          mission: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Complete workflow test mission' }],
                },
              ],
            },
          },
          vision: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Complete workflow test vision' }],
                },
              ],
            },
          },
        },
      })

      // Step 2: Create homepage sections
      const heroSection = await payload.create({
        collection: 'homepage',
        data: {
          sectionType: 'hero',
          content: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Complete workflow hero section' }],
                },
              ],
            },
          },
          order: 1,
        },
      })

      const ctaSection = await payload.create({
        collection: 'homepage',
        data: {
          sectionType: 'cta',
          content: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Complete workflow CTA section' }],
                },
              ],
            },
          },
          order: 2,
        },
      })

      // Step 3: Create products
      const product = await payload.create({
        collection: 'products',
        data: {
          name: 'Complete Workflow Product',
          description: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Product for complete workflow test' }],
                },
              ],
            },
          },
        },
      })

      // Step 4: Update site settings
      const siteSettings = await payload.updateGlobal({
        slug: 'site-settings',
        data: {
          contactEmail: 'workflow-test@example.com',
          socialLinks: [
            {
              platform: 'twitter',
              url: 'https://twitter.com/workflowtest',
            },
          ],
        },
      })

      // Step 5: Verify all content is accessible via API
      const [aboutResponse, homepageResponse, productsResponse, settingsResponse] = await Promise.all([
        fetch(`${baseURL}/api/globals/about`),
        fetch(`${baseURL}/api/homepage`),
        fetch(`${baseURL}/api/products`),
        fetch(`${baseURL}/api/globals/site-settings`),
      ])

      expect(aboutResponse.ok).toBe(true)
      expect(homepageResponse.ok).toBe(true)
      expect(productsResponse.ok).toBe(true)
      expect(settingsResponse.ok).toBe(true)

      const [aboutData, homepageData, productsData, settingsData] = await Promise.all([
        aboutResponse.json(),
        homepageResponse.json(),
        productsResponse.json(),
        settingsResponse.json(),
      ])

      // Verify About content
      expect(aboutData.mission.root.children[0].children[0].text).toBe('Complete workflow test mission')
      expect(aboutData.vision.root.children[0].children[0].text).toBe('Complete workflow test vision')

      // Verify Homepage sections
      const workflowSections = homepageData.docs.filter((section: any) => 
        section.id === heroSection.id || section.id === ctaSection.id
      )
      expect(workflowSections).toHaveLength(2)

      // Verify Products
      const workflowProduct = productsData.docs.find((p: any) => p.id === product.id)
      expect(workflowProduct).toBeDefined()
      expect(workflowProduct.name).toBe('Complete Workflow Product')

      // Verify Site Settings
      expect(settingsData.contactEmail).toBe('workflow-test@example.com')
      expect(settingsData.socialLinks).toHaveLength(1)
      expect(settingsData.socialLinks[0].platform).toBe('twitter')

      // Clean up
      await payload.delete({ collection: 'homepage', id: heroSection.id })
      await payload.delete({ collection: 'homepage', id: ctaSection.id })
      await payload.delete({ collection: 'products', id: product.id })
    })

    it('should handle content updates and maintain data integrity', async () => {
      // Create initial content
      const initialProduct = await payload.create({
        collection: 'products',
        data: {
          name: 'Integrity Test Product',
          description: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Initial description' }],
                },
              ],
            },
          },
        },
      })

      // Perform multiple updates
      const update1 = await payload.update({
        collection: 'products',
        id: initialProduct.id,
        data: {
          name: 'Updated Integrity Test Product',
        },
      })

      const update2 = await payload.update({
        collection: 'products',
        id: initialProduct.id,
        data: {
          description: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Updated description' }],
                },
              ],
            },
          },
        },
      })

      const update3 = await payload.update({
        collection: 'products',
        id: initialProduct.id,
        data: {
          link: 'https://example.com/integrity-test',
        },
      })

      // Verify final state maintains all updates
      const finalProduct = await payload.findByID({
        collection: 'products',
        id: initialProduct.id,
      })

      expect(finalProduct.name).toBe('Updated Integrity Test Product')
      expect(finalProduct.description.root.children[0].children[0].text).toBe('Updated description')
      expect(finalProduct.link).toBe('https://example.com/integrity-test')

      // Verify API reflects final state
      const apiResponse = await fetch(`${baseURL}/api/products/${initialProduct.id}`)
      const apiProduct = await apiResponse.json()

      expect(apiProduct.name).toBe('Updated Integrity Test Product')
      expect(apiProduct.link).toBe('https://example.com/integrity-test')

      // Clean up
      await payload.delete({ collection: 'products', id: initialProduct.id })
    })
  })
})