# CLAUDE.md — AI-Power Ticket Management System

## Project Overview

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
├── CLAUDE.md
├── package.json          # Bun workspace root — workspaces: ["client", "server"]
├── tsconfig.json         # Shared Bun TypeScript config
├── docker-compose.yml    # Services: postgres, server, client
├── server/               # Express API
│   ├── src/
│   │   ├── index.ts      # Entry point — listens on PORT (default 3000)
│   │   ├── app.ts        # Express setup: CORS, session, routes
│   │   ├── lib/prisma.ts # Singleton PrismaClient
│   │   ├── middleware/auth.ts
│   │   └── routes/
│   │       ├── auth.ts   # /api/auth — login, logout, me
│   │       └── tickets.ts # /api/tickets — CRUD
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── .env              # Never commit — copy from .env.example
└── client/               # React + Vite app
    ├── src/
    │   ├── main.tsx
    │   └── App.tsx
    └── vite.config.ts    # /api proxy → http://localhost:3000
```

## Running Locally

```bash
# 1. Install all deps (from root)
bun install

# 2. Start postgres only
docker compose up postgres -d

# 3. Run DB migrations (first time only)
cd server && bunx prisma migrate dev --name init

# 4. Seed admin user + category defaults
bun run db:seed

# 5. Start server (port 3000, hot reload)
bun run dev:server

# 6. Start client (port 5173, HMR)
bun run dev:client
```

**Running URLs:**
- server → http://localhost:3000
- client → http://localhost:5173

## Key Commands

```bash
# From root
bun run dev:server        # start server with --watch
bun run dev:client        # start Vite dev server
bun run build             # build both workspaces
bun run typecheck         # typecheck both workspaces

# From server/
bunx prisma migrate dev   # run new migration
bunx prisma studio        # open Prisma Studio
bun run db:seed           # seed admin + category defaults
```

## Environment Variables (server/.env)

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/helpdesk
BETTER_AUTH_SECRET=change-me-in-production
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
ANTHROPIC_API_KEY=your-api-key-here
PORT=3000
```

## Domain Model

```
User         — id, email, passwordHash, role (ADMIN|AGENT), isActive
Ticket       — id, subject, body, fromEmail, fromName, category, status,
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

## Implementation Phases

See [implementation-plan.md](implementation-plan.md) for the full breakdown. Current phase: **Phase 1 (complete)**.

## Using Context7 for Up-to-Date Docs

Always fetch current documentation via Context7 before working with any library. Use the MCP tools in this order:

1. `mcp__context7__resolve-library-id` — resolve the library name to an ID
2. `mcp__context7__query-docs` — fetch relevant docs with a specific query

### Library IDs (pre-resolved)

| Library | Context7 ID |
|---|---|
| Bun | `/oven-sh/bun` |
| Express 5 | `/websites/expressjs_en_5` |
| Vite | `/websites/vite_dev` |
| Prisma | `/prisma/web` |
| React | `/websites/react_dev` |
| Tailwind CSS | `/tailwindlabs/tailwindcss.com` |
| shadcn/ui | `/llmstxt/ui_shadcn_llms_txt` |
| Anthropic SDK (JS) | `/anthropics/anthropic-sdk-typescript` |

### Example usage

```
# Before adding a new Prisma model or relation:
mcp__context7__query-docs("/prisma/web", "define relations one-to-many TypeScript")

# Before using a new Express 5 feature:
mcp__context7__query-docs("/websites/expressjs_en_5", "error handling middleware async")

# Before a Bun-specific API:
mcp__context7__query-docs("/oven-sh/bun", "Bun.serve websocket")
```

## Code Conventions

- **No comments** unless the WHY is non-obvious
- **No `any`** — use proper types or Prisma-generated types
- Imports use `.ts` extensions (Bun requirement with `allowImportingTsExtensions`)
- Environment variables accessed via `process.env['KEY']` (bracket notation)
- Route handlers always call `next(err)` on catch — never `res.status(500)` directly
- Session augmentation lives in `server/src/middleware/auth.ts`
