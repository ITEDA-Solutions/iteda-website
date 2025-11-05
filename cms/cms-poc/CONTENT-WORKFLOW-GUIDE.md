# Content Management Workflow Guide

This guide documents the complete content editor workflow for the Payload CMS integration, covering all aspects of content creation, editing, and management.

## Overview

The content management system provides a comprehensive workflow for managing website content through Payload CMS. Content editors can manage:

- **Homepage Sections**: Dynamic sections with different types (hero, about, CTA)
- **About Content**: Mission and vision statements (global content)
- **Products**: Product listings with images and descriptions
- **Site Settings**: Contact information and social media links
- **Media**: Image uploads and management

## Content Types and Structure

### 1. Homepage Sections Collection

**Purpose**: Manage dynamic sections on the homepage with flexible content types.

**Fields**:
- `sectionType`: Select from hero, about, or cta
- `content`: Rich text editor for section content
- `order`: Numeric field to control section ordering

**Workflow**:
1. Navigate to Collections → Homepage in the admin panel
2. Click "Create New" to add a section
3. Select the section type from the dropdown
4. Use the rich text editor to create content
5. Set the order number (lower numbers appear first)
6. Save the section

**API Endpoint**: `/api/homepage`
**Frontend Integration**: Sections are automatically rendered on the homepage in order

### 2. About Global Content

**Purpose**: Manage mission and vision statements that appear across the site.

**Fields**:
- `mission`: Rich text field for mission statement
- `vision`: Rich text field for vision statement

**Workflow**:
1. Navigate to Globals → About in the admin panel
2. Edit the mission statement using the rich text editor
3. Edit the vision statement using the rich text editor
4. Save changes (automatically published)

**API Endpoint**: `/api/globals/about`
**Frontend Integration**: Mission and vision content is displayed in dedicated sections

### 3. Products Collection

**Purpose**: Manage product listings with images, descriptions, and links.

**Fields**:
- `name`: Text field for product name
- `description`: Rich text field for product description
- `image`: Upload field linked to Media collection
- `link`: Optional URL field for external product links

**Workflow**:
1. Navigate to Collections → Products in the admin panel
2. Click "Create New" to add a product
3. Enter the product name
4. Use the rich text editor for the description
5. Upload or select an image from the media library
6. Add an optional external link
7. Save the product

**API Endpoint**: `/api/products`
**Frontend Integration**: Products are displayed in a grid layout with images

### 4. Media Collection

**Purpose**: Manage image uploads with automatic processing and optimization.

**Fields**:
- `alt`: Alt text for accessibility
- `filename`: Automatically generated filename
- `mimeType`: Automatically detected file type
- `filesize`: Automatically calculated file size
- `width/height`: Automatically detected dimensions

**Workflow**:
1. Navigate to Collections → Media in the admin panel
2. Click "Create New" or drag and drop files
3. Upload image files (PNG, JPG, WebP supported)
4. Add descriptive alt text for accessibility
5. Save the media entry

**Features**:
- Automatic image resizing (600x400 card format)
- Thumbnail generation for admin interface
- Static file serving at `/media/[filename]`
- Integration with product image fields

**API Endpoint**: `/api/media`

### 5. Site Settings Global

**Purpose**: Manage site-wide settings like contact information and social links.

**Fields**:
- `contactEmail`: Email address for contact purposes
- `socialLinks`: Array of social media platform links
  - `platform`: Select from predefined platforms
  - `url`: Social media profile URL

**Workflow**:
1. Navigate to Globals → Site Settings in the admin panel
2. Update the contact email address
3. Add or edit social media links:
   - Click "Add Social Link"
   - Select the platform from dropdown
   - Enter the profile URL
4. Save changes

**API Endpoint**: `/api/globals/site-settings`
**Frontend Integration**: Used in footer and contact sections

## Content Editor Best Practices

### Rich Text Editing

The rich text editor supports:
- **Formatting**: Bold, italic, underline, strikethrough
- **Structure**: Headings (H1-H6), paragraphs, lists
- **Links**: Internal and external linking
- **Media**: Inline image insertion

**Best Practices**:
- Use headings hierarchically (H1 → H2 → H3)
- Keep paragraphs concise and scannable
- Add alt text to all images for accessibility
- Use descriptive link text (avoid "click here")

### Image Management

**Supported Formats**: PNG, JPG, JPEG, WebP
**Recommended Sizes**: 
- Product images: 600x400px or larger (automatically resized)
- General images: Optimize for web before upload

**Best Practices**:
- Use descriptive filenames before upload
- Always add alt text for accessibility
- Compress images before upload for better performance
- Use consistent aspect ratios for product images

### Content Organization

**Homepage Sections**:
- Use order numbers with gaps (10, 20, 30) for easy reordering
- Keep section content focused and concise
- Test different section types to find the best layout

**Products**:
- Use consistent naming conventions
- Write compelling descriptions that highlight benefits
- Include high-quality product images
- Add external links to detailed product pages when available

## API Integration and Caching

### Frontend Integration

The Next.js frontend automatically fetches content from Payload CMS APIs with:
- **Caching**: 60-second revalidation for optimal performance
- **Error Handling**: Graceful fallbacks for API failures
- **Loading States**: Smooth user experience during content loading

### Content Propagation

Content changes follow this flow:
1. **Edit in Admin**: Content is saved to PostgreSQL database
2. **API Update**: Changes are immediately available via REST API
3. **Frontend Cache**: Next.js cache expires after 60 seconds
4. **User Sees Update**: New content appears within cache window

### Cache Behavior

- **Fresh Content**: New content is immediately available via API
- **Cache Duration**: Frontend caches content for 60 seconds
- **Cache Invalidation**: Automatic after cache expiry
- **Manual Refresh**: Users can refresh browser to see immediate changes

## Testing and Validation

### Content Validation

The system includes automatic validation for:
- **Required Fields**: Mission, vision, product names are required
- **Rich Text**: Content structure validation
- **Image Uploads**: File type and size validation
- **URLs**: Link format validation for social media and product links

### Testing Workflow

1. **Create Content**: Add new content through admin interface
2. **Verify Database**: Content is saved correctly
3. **Check API**: Content appears in API responses
4. **Frontend Display**: Content renders properly on website
5. **Update Content**: Modifications are reflected correctly
6. **Delete Content**: Cleanup works as expected

## Troubleshooting

### Common Issues

**Content Not Appearing**:
- Check if content is saved in admin interface
- Verify API endpoint returns expected data
- Wait for cache expiration (60 seconds) or refresh browser
- Check browser console for JavaScript errors

**Image Upload Issues**:
- Verify file format is supported (PNG, JPG, WebP)
- Check file size is reasonable (< 10MB recommended)
- Ensure media directory has write permissions
- Verify image appears in Media collection after upload

**Rich Text Problems**:
- Use the editor toolbar for formatting
- Check that content saves properly before navigating away
- Verify HTML structure is valid in API response

### Performance Considerations

**Content Loading**:
- Homepage content loads in parallel for optimal performance
- Error boundaries prevent single content failures from breaking the page
- Loading states provide feedback during content fetching

**Image Optimization**:
- Images are automatically resized for consistent display
- Thumbnails are generated for admin interface
- Static file serving is optimized for performance

## Security and Access Control

### Admin Access

- Admin users can create, read, update, and delete all content
- Authentication is required for admin interface access
- Session management handles login/logout securely

### Public API Access

- Read access is public for all content APIs
- Write access requires authentication
- CORS is configured for frontend domain access

### Content Security

- Rich text content is sanitized to prevent XSS
- File uploads are validated for type and size
- Database queries use parameterized statements

## Deployment Considerations

### Environment Variables

Required environment variables:
- `DATABASE_URI`: PostgreSQL connection string
- `PAYLOAD_SECRET`: Secret key for JWT tokens
- `NEXT_PUBLIC_PAYLOAD_URL`: Public URL for API access

### Production Setup

- Database connection pooling for performance
- Static file serving through CDN recommended
- Regular database backups for content protection
- SSL/TLS encryption for admin interface

This workflow guide ensures content editors can effectively manage website content while maintaining data integrity and optimal performance.