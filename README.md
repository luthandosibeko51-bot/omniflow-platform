# Omniflow Platform

The autonomous business acquisition and web generation engine for OmnitechWorks.

## Architecture

- `apps/www`: Marketing site & AI-powered demo viewer (Next.js).
- `apps/crm-dashboard`: Internal lead management & pipeline tracking (Next.js).
- `apps/demo-service`: Microservice for generating AI landing page copy (Next.js).
- `packages/automation`: Autonomous outreach worker (Node.js + OpenAI + Resend).
- `packages/database`: Shared Prisma schema and client.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up database:
   ```bash
   npx turbo run db:setup
   ```

3. Run development servers:
   ```bash
   npm run dev
   ```

## Development

The platform is built with:
- **Framework**: Next.js 16+
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **ORM**: Prisma (SQLite)
- **AI**: OpenAI GPT-4o
- **Email**: Resend
