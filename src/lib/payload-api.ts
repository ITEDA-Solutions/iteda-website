/**
 * Payload CMS API client for fetching content
 */

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';

export interface HomepageSection {
  id: string;
  sectionType: string;
  content: any; // Rich text content
  order: number;
}

export interface AboutContent {
  mission: any; // Rich text content
  vision: any; // Rich text content
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: any; // Rich text content
  image?: {
    url: string;
    alt?: string;
  };
  link?: string;
}

export interface SiteSettings {
  contactEmail: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
}

/**
 * Generic API fetch function with error handling and retry logic
 */
async function fetchFromPayload<T>(endpoint: string, retries = 2): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${PAYLOAD_URL}/api${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 60, // Cache for 60 seconds
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(`Unknown error fetching ${endpoint}`);

      // Only log errors in development to avoid console spam in production
      if (process.env.NODE_ENV === 'development') {
        console.warn(`CMS API attempt ${attempt + 1} failed for ${endpoint}:`, lastError.message);
      }

      // If this is the last attempt, throw the error
      if (attempt === retries) {
        const errorMessage = lastError.message.includes('Failed to fetch')
          ? `CMS server is not available at ${PAYLOAD_URL}. Please ensure the CMS is running.`
          : `Failed to fetch ${endpoint} after ${retries + 1} attempts: ${lastError.message}`;
        throw new Error(errorMessage);
      }

      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  throw lastError!;
}

/**
 * Fetch homepage sections
 */
export async function getHomepageSections(): Promise<HomepageSection[]> {
  try {
    const data = await fetchFromPayload<{ docs: HomepageSection[] }>('/homepage');
    return data.docs.sort((a, b) => a.order - b.order);
  } catch (error) {
    // Return empty array if CMS is not available
    console.warn('Homepage sections not available from CMS, returning empty array');
    return [];
  }
}

/**
 * Fetch about content (mission and vision)
 */
export async function getAboutContent(): Promise<AboutContent> {
  try {
    const data = await fetchFromPayload<AboutContent>('/globals/about');
    return data;
  } catch (error) {
    // Return default content if CMS is not available
    console.warn('About content not available from CMS, returning default content');
    return {
      mission: {
        root: {
          children: [
            {
              type: 'paragraph',
              children: [{ text: 'Mission content will be available when CMS is connected.' }],
            },
          ],
        },
      },
      vision: {
        root: {
          children: [
            {
              type: 'paragraph',
              children: [{ text: 'Vision content will be available when CMS is connected.' }],
            },
          ],
        },
      },
    };
  }
}

/**
 * Fetch all products
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const data = await fetchFromPayload<{ docs: Product[] }>('/products');
    return data.docs;
  } catch (error) {
    // Return empty array if CMS is not available
    console.warn('Products not available from CMS, returning empty array');
    return [];
  }
}

/**
 * Fetch site settings
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const data = await fetchFromPayload<SiteSettings>('/globals/site-settings');
    return data;
  } catch (error) {
    // Return default settings if CMS is not available
    console.warn('Site settings not available from CMS, returning default settings');
    return {
      contactEmail: 'contact@example.com',
      socialLinks: [],
    };
  }
}

/**
 * Fetch all content needed for homepage
 */
export async function getHomepageContent() {
  try {
    const [sections, about, products, siteSettings] = await Promise.all([
      getHomepageSections(),
      getAboutContent(),
      getProducts(),
      getSiteSettings(),
    ]);

    return {
      sections,
      about,
      products,
      siteSettings,
    };
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    throw error;
  }
}