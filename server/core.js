import fs from 'node:fs/promises'
import path from 'node:path'

// One place for form validation + storage, shared by the local Express server
// and the Vercel functions in /api.
const DATA_DIR = process.env.DATA_DIR || '/tmp/aucis-data'

export class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

const isEmail = (value) => typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
const clean = (value) => String(value ?? '').trim()

async function store(file, record) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.appendFile(path.join(DATA_DIR, file), `${JSON.stringify(record)}\n`, 'utf8')
}

export async function saveApplication(body = {}) {
  const name = clean(body.name)
  const email = clean(body.email)

  if (!name || !isEmail(email)) {
    throw new ValidationError('A name and a valid email address are required.')
  }

  await store('applications.jsonl', {
    receivedAt: new Date().toISOString(),
    name,
    email,
    rollNumber: clean(body.rollNumber),
    department: clean(body.department),
    semester: clean(body.semester),
    group: clean(body.group),
    interests: Array.isArray(body.interests) ? body.interests.map(String) : [],
    motivation: clean(body.motivation),
  })
}

export async function saveMessage(body = {}) {
  const name = clean(body.name)
  const email = clean(body.email)
  const message = clean(body.message)

  if (!name || !isEmail(email) || !message) {
    throw new ValidationError('A name, a valid email address and a message are required.')
  }

  await store('messages.jsonl', {
    receivedAt: new Date().toISOString(),
    name,
    email,
    subject: clean(body.subject),
    message,
  })
}
