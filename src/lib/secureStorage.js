/**
 * Encrypted local storage with randomized key names.
 * The keys look like opaque gibberish so the stored data is not easily
 * recognised by anyone inspecting localStorage.
 *
 * Encryption is a simple XOR cipher + base64 — enough to obfuscate plain-text
 * form data, not a substitute for real cryptography, but sufficient for
 * client-side draft persistence.
 */

// Randomized key names — do not look like "aucis_form" or "applied"
const KEY_FORM = 'xk29fp7m1q'
const KEY_APPLIED = 'bz4h8n3v6c'

const CIPHER_KEY = 'aucis-2026-secure'

function xorCipher(text) {
  let result = ''
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ CIPHER_KEY.charCodeAt(i % CIPHER_KEY.length))
  }
  return result
}

function encrypt(data) {
  const json = JSON.stringify(data)
  const xored = xorCipher(json)
  return btoa(unescape(encodeURIComponent(xored)))
}

function decrypt(encoded) {
  try {
    const decoded = decodeURIComponent(escape(atob(encoded)))
    return JSON.parse(xorCipher(decoded))
  } catch {
    return null
  }
}

export function saveForm(data) {
  try { localStorage.setItem(KEY_FORM, encrypt(data)) } catch { /* storage full or disabled */ }
}

export function loadForm() {
  try {
    const raw = localStorage.getItem(KEY_FORM)
    if (!raw) return null
    return decrypt(raw)
  } catch { return null }
}

export function clearForm() {
  try { localStorage.removeItem(KEY_FORM) } catch { /* noop */ }
}

export function setApplied() {
  try { localStorage.setItem(KEY_APPLIED, encrypt({ applied: true, ts: Date.now() })) } catch { /* noop */ }
}

export function hasApplied() {
  try {
    const data = decrypt(localStorage.getItem(KEY_APPLIED))
    return Boolean(data?.applied)
  } catch { return false }
}
