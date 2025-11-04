import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('Homepage Collection', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('should have homepage collection configured', async () => {
    const collections = payload.config.collections
    const homepageCollection = collections.find(collection => collection.slug === 'homepage')
    
    expect(homepageCollection).toBeDefined()
    expect(homepageCollection?.slug).toBe('homepage')
  })

  it('should have correct fields configured', async () => {
    const collections = payload.config.collections
    const homepageCollection = collections.find(collection => collection.slug === 'homepage')
    
    expect(homepageCollection).toBeDefined()
    
    const fields = homepageCollection?.fields || []
    const fieldNames = fields.map(field => 'name' in field ? field.name : null).filter(Boolean)
    
    expect(fieldNames).toContain('sectionType')
    expect(fieldNames).toContain('content')
    expect(fieldNames).toContain('order')
  })

  it('should have sectionType field with correct options', async () => {
    const collections = payload.config.collections
    const homepageCollection = collections.find(collection => collection.slug === 'homepage')
    
    const sectionTypeField = homepageCollection?.fields.find(field => 
      'name' in field && field.name === 'sectionType'
    )
    
    expect(sectionTypeField).toBeDefined()
    expect(sectionTypeField?.type).toBe('select')
    
    if ('options' in sectionTypeField!) {
      const options = sectionTypeField.options as Array<{ value: string; label: string }>
      const optionValues = options.map(option => option.value)
      
      expect(optionValues).toContain('hero')
      expect(optionValues).toContain('about')
      expect(optionValues).toContain('cta')
    }
  })

  it('should create and retrieve homepage sections', async () => {
    // Create a test homepage section
    const testSection = await payload.create({
      collection: 'homepage',
      data: {
        sectionType: 'hero',
        content: {
          root: {
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: 'Welcome to our homepage hero section',
                  },
                ],
              },
            ],
          },
        },
        order: 1,
      },
    })

    expect(testSection).toBeDefined()
    expect(testSection.sectionType).toBe('hero')
    expect(testSection.order).toBe(1)

    // Retrieve the created section
    const sections = await payload.find({
      collection: 'homepage',
      where: {
        sectionType: {
          equals: 'hero',
        },
      },
    })

    expect(sections.docs).toHaveLength(1)
    expect(sections.docs[0].sectionType).toBe('hero')
    expect(sections.docs[0].order).toBe(1)

    // Clean up - delete the test section
    await payload.delete({
      collection: 'homepage',
      id: testSection.id,
    })
  })

  it('should support ordering of sections', async () => {
    // Create multiple test sections with different orders
    const section1 = await payload.create({
      collection: 'homepage',
      data: {
        sectionType: 'hero',
        content: {
          root: {
            children: [
              {
                type: 'paragraph',
                children: [{ text: 'Hero section' }],
              },
            ],
          },
        },
        order: 2,
      },
    })

    const section2 = await payload.create({
      collection: 'homepage',
      data: {
        sectionType: 'about',
        content: {
          root: {
            children: [
              {
                type: 'paragraph',
                children: [{ text: 'About section' }],
              },
            ],
          },
        },
        order: 1,
      },
    })

    // Retrieve sections ordered by order field
    const sections = await payload.find({
      collection: 'homepage',
      sort: 'order',
    })

    expect(sections.docs.length).toBeGreaterThanOrEqual(2)
    
    // Find our test sections
    const testSections = sections.docs.filter(doc => 
      doc.id === section1.id || doc.id === section2.id
    )
    
    expect(testSections).toHaveLength(2)
    
    // Verify ordering (section2 should come first with order: 1)
    const sortedTestSections = testSections.sort((a, b) => a.order - b.order)
    expect(sortedTestSections[0].sectionType).toBe('about')
    expect(sortedTestSections[1].sectionType).toBe('hero')

    // Clean up
    await payload.delete({ collection: 'homepage', id: section1.id })
    await payload.delete({ collection: 'homepage', id: section2.id })
  })
})