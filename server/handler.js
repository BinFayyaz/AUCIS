/**
 * Wraps a form handler as a Vercel Node function (POST only, JSON in/out).
 * Request bodies arrive already parsed by the Vercel runtime.
 */
export function jsonHandler(save) {
  return async function handler(req, res) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ error: 'Method not allowed.' })
    }

    try {
      await save(req.body || {})
      return res.status(201).json({ ok: true })
    } catch (error) {
      const status = error.status || 500
      if (status === 500) console.error(error)
      return res
        .status(status)
        .json({ error: status === 500 ? 'Something went wrong. Please try again.' : error.message })
    }
  }
}
