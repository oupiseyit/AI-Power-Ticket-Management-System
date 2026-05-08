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
- **Postmark** — inbound webhook (email → ticket creation) and outbound (send AI replies)

## Infrastructure
- **Docker** + **Docker Compose** — containerized local development and deployment
  - Services: `frontend`, `backend`, `postgres`

## Project Structure
```
/
├── frontend/        # React + Vite app
├── backend/         # Express + TypeScript API
├── docker-compose.yml
└── ...
```
