import express from 'express'
import { saveApplication, saveMessage } from './core.js'

const app = express()
const PORT = Number(process.env.API_PORT || 4000)

app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/applications', async (req, res, next) => {
  try {
    await saveApplication(req.body)
    res.status(201).json({ ok: true })
  } catch (error) {
    if (error.status) return res.status(error.status).json({ error: error.message })
    next(error)
  }
})

app.post('/api/messages', async (req, res, next) => {
  try {
    await saveMessage(req.body)
    res.status(201).json({ ok: true })
  } catch (error) {
    if (error.status) return res.status(error.status).json({ error: error.message })
    next(error)
  }
})

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Something went wrong. Please try again.' })
})

app.listen(PORT, '127.0.0.1', () => {
  console.log(`AUCIS API listening on http://127.0.0.1:${PORT}`)
})
