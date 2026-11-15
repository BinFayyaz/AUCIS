import test from 'node:test'
import assert from 'node:assert/strict'
import { validateRegistration } from './registration.js'

const valid = { name: 'Test Applicant', email: 'test@example.test', year: '1st year', agreed: true }
test('reports errors against each missing input instead of the mascot', () => {
  assert.deepEqual(Object.keys(validateRegistration({ name: '', email: '', year: '', agreed: false })), ['name', 'email', 'year', 'agreed'])
})
test('invalid email and whitespace-only names are rejected', () => {
  assert.equal(validateRegistration({ ...valid, email: 'wrong' }).email, 'That email address looks invalid.')
  assert.ok(validateRegistration({ ...valid, name: '  ' }).name)
})
test('valid registration passes and optional fields remain optional', () => {
  assert.deepEqual(validateRegistration(valid), {})
})
