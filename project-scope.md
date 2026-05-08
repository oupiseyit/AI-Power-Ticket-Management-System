# AI-Power Ticket Management System

## Problem

We receive hundreds of support emails daily. Our agents manually read, classify, and respond to each ticket - which is slow and leads to impersonal, canned responses.

## Solution

Build a ticket management system that uses AI to automatically classify and draft responses to support tickets - delivering faster, more personalized responses to students while freeing up agents for complex issues.

## User Roles

- **Admin** — manages users, settings, knowledge base, and per-category auto-send rules
- **Agent** — handles tickets, reviews/edits AI-drafted replies, approves sends, and escalates manually

## Ticket Categories

Each ticket belongs to exactly one category:
- General Question
- Technical Question
- Refund Question

## Ticket Statuses

`Open` → `Resolved` → `Closed`

## Features

- Receive support emails and create tickets
- AI-powered ticket classification (General / Technical / Refund)
- AI summaries of each ticket
- AI-suggested replies generated from the knowledge base
- Configurable auto-send per category (admins toggle in settings)
- Agent reply review and approval flow
- Manual escalation flag — agents can flag any ticket to handle it directly
- Ticket list with filtering and sorting
- Ticket detail view
- Dashboard to view and manage all tickets
- Knowledge base management — admins create and edit Q&A pairs used by the AI
- User management — Admin and Agent roles

## Open Decisions

- **Email ingestion**: IMAP polling vs. inbound email webhook (SendGrid, Mailgun, Postmark) — decide before backend architecture starts
