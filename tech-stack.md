# Tech Stack

## Frontend
- **React** with **TypeScript** — component-based UI
- **Vite** — build tool and dev server
- **Tailwind CSS** + **shadcn/ui** — styling and pre-built components
- **React Router** — client-side routing

## Backend
- **Node.js** with **Express** and **TypeScript** — REST API server
- **Prisma ORM** — type-safe database access

## Database
- **PostgreSQL** — primary data store for tickets, users, knowledge base, sessions

## Authentication
- **Database sessions** via `express-session` + `connect-pg-simple`
  - Sessions stored in PostgreSQL
  - No third-party auth service

## AI
- **Claude API (Anthropic)** — ticket classification, summaries, and reply generation

## Email
- TBD — inbound and outbound email provider not yet decided

## Deployment
- **Docker** + **Docker Compose**
  - Services: `frontend`, `backend`, `postgres`
  - Multi-stage `Dockerfile` for each service (dev and production builds)
  - Environment-specific configs via `.env` files

## Project Structure
```
/
├── frontend/        # React + Vite app
├── backend/         # Express + TypeScript API
├── docker-compose.yml
└── ...
```
