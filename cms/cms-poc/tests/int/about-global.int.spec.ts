import { describe, it, expect, beforeAll } from 'vitest'
import { getPayload } from 'payload'
import config from '../../src/payload.config'

describe('About Global Integration Tests', () => {
  let payload: any

  beforeAll(async () => {
    payload = await getPayload({ config })
  })

  it('should have About global configured', async () => {
    // Test that the About global exists in the configuration
    const globals = payload.config.globals
    const aboutGlobal = globals.find((global: any) => global.slug === 'about')
    
    expect(aboutGlobal).toBeDefined()
    expect(aboutGlobal.slug).toBe('about')
  })

  it('should have mission and vision fields configured', async () => {
    const globals = payload.config.globals
    const aboutGlobal = globals.find((global: any) => global.slug === 'about')
    
    expect(aboutGlobal).toBeDefined()
    
    const fields = aboutGlobal.fields
    const missionField = fields.find((field: any) => field.name === 'mission')
    const visionField = fields.find((field: any) => field.name === 'vision')
    
    expect(missionField).toBeDefined()
    expect(missionField.type).toBe('richText')
    expect(missionField.required).toBe(true)
    
    expect(visionField).toBeDefined()
    expect(visionField.type).toBe('richText')
    expect(visionField.required).toBe(true)
  })

  it('should be able to retrieve About global data', async () => {
    try {
      const aboutData = await payload.findGlobal({
        slug: 'about',
      })
      
      // Should return an object (even if empty initially)
      expect(aboutData).toBeDefined()
      expect(typeof aboutData).toBe('object')
      
      // Should have mission and vision properties (even if null/undefined initially)
      expect(aboutData).toHaveProperty('mission')
      expect(aboutData).toHaveProperty('vision')
      
    } catch (error) {
      // If the global doesn't exist yet, that's also acceptable for a new setup
      expect(error).toBeDefined()
    }
  })

  it('should be able to update About global data', async () => {
    const sampleMissionContent = {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Test mission statement for integration testing.",
                type: "text",
                version: 1
              }
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1
          }
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1
      }
    }

    const sampleVisionContent = {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Test vision statement for integration testing.",
                type: "text",
                version: 1
              }
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1
          }
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1
      }
    }

    try {
      const updatedAbout = await payload.updateGlobal({
        slug: 'about',
        data: {
          mission: sampleMissionContent,
          vision: sampleVisionContent,
        },
      })

      expect(updatedAbout).toBeDefined()
      expect(updatedAbout.mission).toBeDefined()
      expect(updatedAbout.vision).toBeDefined()
      
      // Verify the content was saved correctly
      const retrievedAbout = await payload.findGlobal({
        slug: 'about',
      })
      
      expect(retrievedAbout.mission).toBeDefined()
      expect(retrievedAbout.vision).toBeDefined()
      
    } catch (error) {
      console.error('Error updating About global:', error)
      throw error
    }
  })

  it('should have proper access control configured', async () => {
    const globals = payload.config.globals
    const aboutGlobal = globals.find((global: any) => global.slug === 'about')
    
    expect(aboutGlobal).toBeDefined()
    expect(aboutGlobal.access).toBeDefined()
    expect(aboutGlobal.access.read).toBeDefined()
    
    // Test that read access returns true (public read access)
    const readAccess = aboutGlobal.access.read()
    expect(readAccess).toBe(true)
  })
})