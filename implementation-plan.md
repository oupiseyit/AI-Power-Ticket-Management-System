# Implementation Plan

## Phase 1 — Project Setup & Infrastructure

- [ ] Initialize monorepo folder structure (`/frontend`, `/backend`)
- [ ] Set up backend: Node.js + Express + TypeScript (`tsconfig`, `nodemon`, `ts-node`)
- [ ] Set up frontend: React + Vite + TypeScript
- [ ] Install and configure Tailwind CSS + shadcn/ui in frontend
- [ ] Write `docker-compose.yml` with three services: `frontend`, `backend`, `postgres`
- [ ] Write `Dockerfile` for frontend and backend
- [ ] Connect backend to PostgreSQL via Prisma (`prisma init`, `DATABASE_URL`)
- [ ] Set up `.env` files for backend (DB, session secret, Claude API key, email provider key)
- [ ] Seed the database with an initial admin user
- [ ] Verify full stack runs locally with Docker Compose

---

## Phase 2 — Authentication

- [ ] Define `User` model in Prisma schema (`id`, `email`, `passwordHash`, `role: ADMIN | AGENT`, `createdAt`)
- [ ] Run first migration
- [ ] Seed script: create initial admin user
- [ ] Install `express-session`, `connect-pg-simple`, `bcrypt`
- [ ] `POST /api/auth/login` — validate credentials, create session
- [ ] `POST /api/auth/logout` — destroy session
- [ ] `GET /api/auth/me` — return current session user
- [ ] Auth middleware: protect all API routes, check role where needed
- [ ] Login page (frontend)
- [ ] Store current user in React context
- [ ] Redirect unauthenticated users to login; redirect logged-in users away from login

---

## Phase 3 — Ticket Core (no email, no AI yet)

- [ ] Define `Ticket` model in Prisma schema (`id`, `subject`, `body`, `fromEmail`, `fromName`, `category`, `status`, `assignedTo`, `isEscalated`, `createdAt`, `updatedAt`)
- [ ] `GET /api/tickets` — list tickets with filters (status, category) and sorting
- [ ] `GET /api/tickets/:id` — ticket detail
- [ ] `PATCH /api/tickets/:id` — update status, category, assignee, escalation flag
- [ ] Ticket list page: table with filter bar (status, category), sorting by date
- [ ] Ticket detail page: shows subject, body, sender, status, category, escalation toggle
- [ ] Manual ticket creation form (for dev/testing before email is wired up)

---

## Phase 4 — Email Ingestion

> Email provider TBD. Tasks will be updated once a provider is chosen.

- [ ] Decide on email provider (inbound webhook vs. IMAP)
- [ ] `POST /api/webhooks/email/inbound` — receive inbound email payload, create ticket
- [ ] Parse payload: extract `subject`, `body` (text), `from` name + email
- [ ] Secure the inbound webhook endpoint
- [ ] Test end-to-end: send email → ticket appears in list

---

## Phase 5 — AI Features

- [ ] Install Anthropic SDK, configure with `ANTHROPIC_API_KEY`
- [ ] AI classification: on ticket create, call Claude to assign category (General / Technical / Refund)
- [ ] AI summary: generate a 2–3 sentence summary of the ticket body
- [ ] AI suggested reply: given ticket + relevant KB entries, generate a draft reply
- [ ] Store `aiSummary` and `aiSuggestedReply` on the Ticket model
- [ ] Display summary and suggested reply in ticket detail view

---

## Phase 6 — Knowledge Base

- [ ] Define `KnowledgeBaseEntry` model (`id`, `question`, `answer`, `createdAt`, `updatedAt`)
- [ ] `GET /api/kb` — list all entries
- [ ] `POST /api/kb` — create entry (admin only)
- [ ] `PUT /api/kb/:id` — update entry (admin only)
- [ ] `DELETE /api/kb/:id` — delete entry (admin only)
- [ ] Knowledge base admin page: table with create/edit/delete
- [ ] Wire KB entries into AI suggested reply: fetch relevant entries before calling Claude

---

## Phase 7 — Reply Workflow

- [ ] Define `CategorySetting` model (`category`, `autoSend: boolean`)
- [ ] Seed default settings (all categories: `autoSend: false`)
- [ ] `GET /api/settings/categories` — get per-category auto-send config
- [ ] `PATCH /api/settings/categories/:category` — toggle auto-send (admin only)
- [ ] On ticket create: if auto-send is on for its category, send reply immediately via email provider
- [ ] If auto-send is off: show "Send Reply" button in ticket detail for agent to review/edit/approve
- [ ] `POST /api/tickets/:id/reply` — send reply via email provider, mark ticket as `Resolved`
- [ ] Settings page (admin): toggle auto-send per category
- [ ] Escalation toggle: agent can mark a ticket as escalated (`isEscalated: true`)

---

## Phase 8 — Dashboard

- [ ] `GET /api/dashboard/stats` — counts: open, resolved, closed, escalated
- [ ] `GET /api/dashboard/by-category` — ticket counts per category
- [ ] Dashboard page: summary cards (open, resolved, closed, escalated)
- [ ] Recent tickets list on dashboard
- [ ] Category breakdown (bar chart or simple count list)

---

## Phase 9 — User Management

- [ ] `GET /api/users` — list all users (admin only)
- [ ] `POST /api/users` — create agent account (admin only)
- [ ] `PATCH /api/users/:id` — update role or deactivate (admin only)
- [ ] User management page: table of users with create form and deactivate action
- [ ] Prevent deactivated users from logging in

---

## Phase 10 — Polish & Production Readiness

- [ ] Global error handling middleware in Express
- [ ] Input validation on all API routes (e.g., `zod`)
- [ ] Loading and error states throughout the frontend
- [ ] Production `Dockerfile` builds (multi-stage, no dev dependencies)
- [ ] Environment variable documentation in `README.md`
- [ ] Final end-to-end test: email in → ticket created → AI classifies + summarizes → agent reviews reply → reply sent → ticket resolved
