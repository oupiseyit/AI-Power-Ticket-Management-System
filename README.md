# AI-Power Ticket Management System

A full-stack ticket management system that uses AI (Claude API) to classify support emails, generate summaries, and draft replies. Agents review and approve AI-generated responses; admins configure auto-send rules per category.

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime / Package manager | Bun |
| Server | Express 5 + TypeScript |
| Client | React 19 + Vite 6 + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| ORM | Prisma 6 |
| Database | PostgreSQL 16 |
| Auth | express-session + connect-pg-simple |
| AI | Claude API (Anthropic SDK) |
| Containers | Docker + Docker Compose |

## Project Structure

```
/
├── package.json          # Bun workspace root — workspaces: ["client", "server"]
├── tsconfig.json         # Shared TypeScript config
├── docker-compose.yml    # Services: postgres, server, client
├── server/               # Express API
│   ├── src/
│   │   ├── index.ts      # Entry point (PORT 3000)
│   │   ├── app.ts        # Express setup: CORS, session, routes
│   │   ├── lib/prisma.ts
│   │   ├── middleware/auth.ts
│   │   └── routes/
│   │       ├── auth.ts   # /api/auth
│   │       └── tickets.ts # /api/tickets
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── .env              # Copy from .env.example — never commit
└── client/               # React + Vite app
    ├── src/
    │   ├── main.tsx
    │   └── App.tsx
    └── vite.config.ts    # /api proxy → http://localhost:3000
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) >= 1.x
- [Docker](https://www.docker.com) (for PostgreSQL)
- Anthropic API key

### Setup

```bash
# 1. Install all dependencies
bun install

# 2. Copy and fill in environment variables
cp server/.env.example server/.env

# 3. Start PostgreSQL
docker compose up postgres -d

# 4. Run DB migrations
cd server && bunx prisma migrate dev --name init

# 5. Seed admin user and category defaults
cd server && bun run db:seed
```

### Running

```bash
# Start the API server (port 3000, hot reload)
bun run dev:server

# Start the client (port 5173, HMR)
bun run dev:client
```

- Client: http://localhost:5173
- Server: http://localhost:3000

## Environment Variables

Create `server/.env` from the example:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/helpdesk
BETTER_AUTH_SECRET=change-me-in-production
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
ANTHROPIC_API_KEY=your-api-key-here
PORT=3000
```

## Key Commands

```bash
# Root
bun run dev:server        # start server with --watch
bun run dev:client        # start Vite dev server
bun run build             # build both workspaces
bun run typecheck         # typecheck both workspaces

# server/
bunx prisma migrate dev   # run new migration
bunx prisma studio        # open Prisma Studio
bun run db:seed           # seed admin + category defaults
```

## Domain Model

```
User               — id, email, passwordHash, role (ADMIN|AGENT), isActive
Ticket             — id, subject, body, fromEmail, fromName, category, status,
                     isEscalated, aiSummary, aiSuggestedReply, assignedToId
KnowledgeBaseEntry — id, question, answer
CategorySetting    — category (PK), autoSend (bool)
```

Ticket statuses: `OPEN → RESOLVED → CLOSED`
Ticket categories: `GENERAL | TECHNICAL | REFUND`

## API Routes

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | /api/health | — | Health check |
| POST | /api/auth/login | — | Login, create session |
| POST | /api/auth/logout | session | Destroy session |
| GET | /api/auth/me | session | Current user |
| GET | /api/tickets | session | List tickets (filter: status, category) |
| GET | /api/tickets/:id | session | Ticket detail |
| POST | /api/tickets | session | Create ticket |
| PATCH | /api/tickets/:id | session | Update status/category/assignee/escalation |
