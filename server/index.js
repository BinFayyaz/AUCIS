import express from 'express'
import fs from 'node:fs/promises'
import path from 'node:path'

const app = express()
const PORT = Number(process.env.API_PORT || 4000)
const DATA_DIR = process.env.DATA_DIR || '/tmp/aucis-data'

await fs.mkdir(DATA_DIR, { recursive: true })

app.use(express.json({ limit: '100kb' }))

const isEmail = (value) => typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

async function store(file, record) {
  await fs.appendFile(path.join(DATA_DIR, file), `${JSON.stringify(record)}\n`, 'utf8')
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/applications', async (req, res) => {
  const body = req.body || {}
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()

  if (!name || !isEmail(email)) {
    return res.status(400).json({ error: 'A name and a valid email address are required.' })
  }

  const record = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    rollNumber: String(body.rollNumber || '').trim(),
    department: String(body.department || '').trim(),
    year: String(body.year || '').trim(),
    interests: Array.isArray(body.interests) ? body.interests.map(String) : [],
    motivation: String(body.motivation || '').trim(),
  }

  await store('applications.jsonl', record)
  res.status(201).json({ ok: true })
})

app.post('/api/messages', async (req, res) => {
  const body = req.body || {}
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const message = String(body.message || '').trim()

  if (!name || !isEmail(email) || !message) {
    return res.status(400).json({ error: 'A name, a valid email address and a message are required.' })
  }

  await store('messages.jsonl', {
    receivedAt: new Date().toISOString(),
    name,
    email,
    subject: String(body.subject || '').trim(),
    message,
  })

  res.status(201).json({ ok: true })
})

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Something went wrong. Please try again.' })
})

app.listen(PORT, '127.0.0.1', () => {
  console.log(`AUCIS API listening on http://127.0.0.1:${PORT} (data: ${DATA_DIR})`)
})
