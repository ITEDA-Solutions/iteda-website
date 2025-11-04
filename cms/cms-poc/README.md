# Payload CMS Integration for ITEDA Website

This is a Payload CMS project configured with PostgreSQL support for managing dynamic content on the ITEDA website.

## Prerequisites

- Node.js 18.20.2+ or 20.9.0+
- npm or pnpm
- Supabase PostgreSQL database

## Setup Instructions

### 1. Environment Configuration

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your Supabase credentials:
   ```env
   # Replace with your actual Supabase PostgreSQL connection string
   DATABASE_URI=postgresql://postgres:[YOUR_PASSWORD]@db.[YOUR_PROJECT_REF].supabase.co:5432/postgres
   
   # Generate a secure 32+ character secret key
   PAYLOAD_SECRET=your-secure-32-character-secret-key-here
   
   # Local development URL
   NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
   ```

### 2. Install Dependencies and Start Development Server

```bash
npm install
npm run dev
```

### 3. Access Admin Interface

1. Open your browser and navigate to: `http://localhost:3000/admin`
2. Create your first admin user account when prompted
3. You now have full access to the content management system

### 4. Verify Setup

- Admin interface should be accessible at `/admin`
- Database connection should be established automatically
- You can start creating content through the admin interface

#### Docker (Optional)

If you prefer to use Docker for local development instead of a local MongoDB instance, the provided docker-compose.yml file can be used.

To do so, follow these steps:

- Modify the `MONGODB_URI` in your `.env` file to `mongodb://127.0.0.1/<dbname>`
- Modify the `docker-compose.yml` file's `MONGODB_URI` to match the above `<dbname>`
- Run `docker-compose up` to start the database, optionally pass `-d` to run in the background.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
