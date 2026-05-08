import { Router } from 'express'
import type { TicketStatus, TicketCategory } from '@prisma/client'
import { prisma } from '../lib/prisma.ts'
import { requireAuth } from '../middleware/auth.ts'

export const ticketsRouter = Router()

ticketsRouter.use(requireAuth)

ticketsRouter.get('/', async (req, res, next) => {
  try {
    const { status, category } = req.query
    const tickets = await prisma.ticket.findMany({
      where: {
        ...(status ? { status: status as TicketStatus } : {}),
        ...(category ? { category: category as TicketCategory } : {}),
      },
      orderBy: { createdAt: 'desc' },
      include: { assignedTo: { select: { id: true, email: true } } },
    })
    res.json(tickets)
  } catch (err) {
    next(err)
  }
})

ticketsRouter.get('/:id', async (req, res, next) => {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: req.params['id'] },
      include: { assignedTo: { select: { id: true, email: true } } },
    })
    if (!ticket) {
      res.status(404).json({ error: 'Not found' })
      return
    }
    res.json(ticket)
  } catch (err) {
    next(err)
  }
})

ticketsRouter.post('/', async (req, res, next) => {
  try {
    const { subject, body, fromEmail, fromName } = req.body as {
      subject: string
      body: string
      fromEmail: string
      fromName: string
    }
    const ticket = await prisma.ticket.create({
      data: { subject, body, fromEmail, fromName },
    })
    res.status(201).json(ticket)
  } catch (err) {
    next(err)
  }
})

ticketsRouter.patch('/:id', async (req, res, next) => {
  try {
    const { status, category, assignedToId, isEscalated } = req.body as {
      status?: TicketStatus
      category?: TicketCategory
      assignedToId?: string | null
      isEscalated?: boolean
    }
    const ticket = await prisma.ticket.update({
      where: { id: req.params['id'] },
      data: {
        ...(status !== undefined ? { status } : {}),
        ...(category !== undefined ? { category } : {}),
        ...(assignedToId !== undefined ? { assignedToId } : {}),
        ...(isEscalated !== undefined ? { isEscalated } : {}),
      },
    })
    res.json(ticket)
  } catch (err) {
    next(err)
  }
})
