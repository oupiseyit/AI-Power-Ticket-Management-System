import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'
import { authRouter } from './routes/auth.ts'
import { ticketsRouter } from './routes/tickets.ts'

const app = express()
const PgStore = connectPgSimple(session)

app.use(
  cors({
    origin: process.env['FRONTEND_URL'] ?? 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is up and running' })
})

app.use(
  session({
    store: new PgStore({ conString: process.env['DATABASE_URL'], createTableIfMissing: true }),
    secret: process.env['SESSION_SECRET'] ?? 'change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
)

app.use('/api/auth', authRouter)
app.use('/api/tickets', ticketsRouter)

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

export default app
