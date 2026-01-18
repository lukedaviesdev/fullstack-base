# Fullstack Base

A production-ready fullstack starter template with React Router, Express, Prisma, and JWT authentication.

## ✨ Features

- **Frontend**: React 19 + React Router v7 + TanStack Query + Tailwind CSS + shadcn/ui
- **Backend**: Express 5 + Prisma ORM + PostgreSQL
- **Auth**: JWT authentication with bcrypt password hashing
- **Theming**: Light/dark mode with 22 color scheme options (persisted to DB)
- **Protected Routes**: Ready-to-use auth middleware and route guards

## 🚀 Quick Start

### Prerequisites

- Node.js v20+
- pnpm
- PostgreSQL database - choose one:
  - **[Prisma Postgres](https://www.prisma.io/postgres)** (recommended) - zero config, includes dev proxy
  - **[Neon](https://neon.tech)** / **[Supabase](https://supabase.com)** - free tier available
  - **Local PostgreSQL** - run your own instance

### 1. Clone & Install

```bash
# Clone the repo (or use as template)
git clone <your-repo-url> my-project
cd my-project

# Install all dependencies
pnpm install
cd frontend && pnpm install
cd ../backend && pnpm install
cd ..
```

### 2. Configure Environment

Create `backend/.env`:

```env
DATABASE_URL="your-database-connection-string"
JWT_SECRET="change-this-to-a-secure-random-string"
PORT=3001
```

> 💡 **Tip**: Generate a secure JWT secret with `openssl rand -base64 32`

### 3. Setup Database

Choose your database provider and follow the appropriate path:

#### Option A: Prisma Postgres (Recommended)

Prisma Postgres includes a local development proxy that handles connection pooling and caching.

1. Create a project at [prisma.io/postgres](https://www.prisma.io/postgres)
2. Copy your `DATABASE_URL` to `backend/.env`
3. Setup and run:

```bash
cd backend
pnpm db:push      # Create tables
pnpm db:generate  # Generate client
cd ..
pnpm dev          # Runs db proxy + api + frontend
```

#### Option B: Standard PostgreSQL (Neon, Supabase, Local)

For any standard PostgreSQL database, you don't need the Prisma dev proxy.

1. Create your database and get the connection string
2. Set `DATABASE_URL` in `backend/.env`:
   ```env
   # Neon example
   DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/mydb?sslmode=require"

   # Local example
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb"
   ```
3. Setup and run:

```bash
cd backend
pnpm db:push      # Create tables
pnpm db:generate  # Generate client
cd ..
pnpm dev:no-proxy # Runs api + frontend (no db proxy)
```

### 4. You're Ready! 🎉

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 📁 Project Structure

```
fullstack-base/
├── frontend/               # React Router app
│   ├── app/
│   │   ├── components/     # UI components (shadcn/ui)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── layouts/        # Page layouts (protected routes)
│   │   ├── lib/            # Utilities & API client
│   │   ├── providers/      # Context providers
│   │   ├── routes/         # Page components
│   │   └── services/       # API service functions
│   └── package.json
├── backend/                # Express API
│   ├── src/
│   │   ├── middleware/     # Auth middleware
│   │   ├── routes/         # API routes
│   │   └── utils/          # JWT & password utils
│   ├── lib/                # Prisma client
│   ├── prisma/             # Schema & migrations
│   └── package.json
└── package.json            # Root workspace
```

## 📜 Available Scripts

### Root

| Script | Description |
|--------|-------------|
| `pnpm dev` | Run all services (db proxy + api + web) - for Prisma Postgres |
| `pnpm dev:no-proxy` | Run api + web only - for standard PostgreSQL |
| `pnpm dev:backend` | Run backend + database proxy |
| `pnpm dev:backend:no-proxy` | Run backend only (no db proxy) |
| `pnpm dev:frontend` | Run frontend only |

### Backend (`cd backend`)

| Script | Description |
|--------|-------------|
| `pnpm dev` | Run Express server with hot reload |
| `pnpm dev:db` | Run Prisma database proxy |
| `pnpm db:push` | Push schema to database |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:studio` | Open Prisma Studio GUI |
| `pnpm db:migrate` | Run migrations |
| `pnpm db:reset` | Reset database |

### Frontend (`cd frontend`)

| Script | Description |
|--------|-------------|
| `pnpm dev` | Run React Router dev server |
| `pnpm build` | Build for production |
| `pnpm typecheck` | Run TypeScript checks |

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Create new user | No |
| `POST` | `/auth/login` | Login user | No |
| `GET` | `/auth/me` | Get current user | Yes |
| `PATCH` | `/auth/preferences` | Update theme preferences | Yes |

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | API health check |

## 🎨 Customizing

### Rename the Project

1. Update `name` in root `package.json`
2. Update branding in `frontend/app/components/navbar.tsx`
3. Update storage keys in `frontend/app/root.tsx`

### Add New Routes

1. Create route file in `frontend/app/routes/`
2. Add to `frontend/app/routes.ts`
3. For protected routes, wrap with the `ProtectedLayout`

### Add New API Endpoints

1. Create route file in `backend/src/routes/`
2. Import and use in `backend/src/index.ts`
3. Use `authMiddleware` for protected endpoints

### Modify Database Schema

1. Edit `backend/prisma/schema.prisma`
2. Run `pnpm db:push` (development) or `pnpm db:migrate` (production)
3. Run `pnpm db:generate` to update client

### Switch Database Providers

The template works with any PostgreSQL database. If switching from Prisma Postgres to a standard provider (or vice versa):

1. Update `DATABASE_URL` in `backend/.env`
2. Use `pnpm dev:no-proxy` for standard PostgreSQL, `pnpm dev` for Prisma Postgres

## 🧪 Testing the API

Import the Postman collection from `backend/postman/Auth.postman_collection.json` to test all auth endpoints.

## 📦 Deploying

### Frontend

Build and deploy to any static host or use SSR:

```bash
cd frontend
pnpm build
pnpm start  # For SSR
```

### Backend

```bash
cd backend
pnpm start
```

Set production environment variables:
- `DATABASE_URL` - Production database connection string
- `JWT_SECRET` - Secure random string
- `PORT` - Server port (default: 3001)

## 📄 License

MIT
