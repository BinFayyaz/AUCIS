import { useState } from 'react'
import Icon from './Icon.jsx'
import { postJson } from '../lib/api.js'
import { interests } from '../data/site.js'

const years = ['1st year', '2nd year', '3rd year', '4th year', 'Postgraduate']

const initialForm = {
  name: '',
  email: '',
  rollNumber: '',
  department: '',
  year: '',
  interests: [],
  motivation: '',
  agreed: false,
}

/**
 * The registration form overlay that slides up from the bottom of the screen.
 * Mounted throughout the join sequence; its vertical position is driven by
 * `joinPhase` so it slides in as the robot "pulls" it up.
 */
export default function JoinFormOverlay({ joinPhase, onError, onClearError, onClose }) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    onClearError?.()
  }

  const toggleInterest = (interest) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
    onClearError?.()
  }

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your full name.'
    if (!form.email.trim()) return 'Please enter your email address.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'That email address looks invalid.'
    if (!form.year) return 'Please select your year of study.'
    if (!form.agreed) return 'Please agree to the code of conduct first.'
    return null
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const error = validate()
    if (error) {
      onError(error)
      return
    }
    setStatus('sending')
    try {
      await postJson('/api/applications', {
        name: form.name,
        email: form.email,
        rollNumber: form.rollNumber,
        department: form.department,
        year: form.year,
        interests: form.interests,
        motivation: form.motivation,
      })
      setStatus('sent')
    } catch (err) {
      onError(err.message)
      setStatus('idle')
    }
  }

  const panelTransform = {
    'hands-down': 'translateY(100%)',
    'hands-up': 'translateY(50%)',
    'flying-up': 'translateY(8%)',
    form: 'translateY(0)',
    error: 'translateY(0)',
  }[joinPhase] || 'translateY(100%)'

  const overlayVisible = ['hands-down', 'hands-up', 'flying-up', 'form', 'error'].includes(joinPhase)
  const isActive = joinPhase === 'form' || joinPhase === 'error'

  if (status === 'sent') {
    return (
      <div
        className="fixed inset-0 z-40 flex items-center justify-center bg-ink/80 backdrop-blur-sm"
        style={{
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? 'auto' : 'none',
          transition: 'opacity 500ms',
        }}
      >
        <div className="surface max-w-md p-8 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-sage/40 bg-sage/10 text-sage">
            <Icon name="check" size={20} />
          </span>
          <h3 className="mt-5 text-2xl">Application received.</h3>
          <p className="mt-2 text-sm leading-relaxed text-cream/55">
            Thank you for applying to AUCIS. We'll be in touch at the email you gave us.
          </p>
          <button onClick={onClose} className="btn-ghost mt-6 text-[13px]">
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-40 overflow-hidden"
      style={{
        opacity: overlayVisible ? 1 : 0,
        pointerEvents: overlayVisible ? 'auto' : 'none',
        transition: 'opacity 500ms',
      }}
    >
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto border-t border-cream/10 bg-navy/95"
        style={{
          transform: panelTransform,
          transition: 'transform 700ms ease-in-out',
        }}
      >
        <div className="container-page py-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="eyebrow">
                <span className="h-px w-8 bg-sand/50" />
                Application
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl">Join AUCIS</h2>
            </div>
            <button
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full border border-cream/10 text-cream/60 transition hover:text-cream"
              aria-label="Close"
            >
              <Icon name="close" size={16} />
            </button>
          </div>

          <form onSubmit={onSubmit} noValidate className="mt-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="overlay-name">
                  Full name
                </label>
                <input
                  id="overlay-name"
                  className="field"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="label" htmlFor="overlay-email">
                  Email
                </label>
                <input
                  id="overlay-email"
                  type="email"
                  className="field"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="label" htmlFor="overlay-roll">
                  Roll number
                </label>
                <input
                  id="overlay-roll"
                  className="field"
                  value={form.rollNumber}
                  onChange={(e) => update('rollNumber', e.target.value)}
                  placeholder="e.g. 240123"
                />
              </div>
              <div>
                <label className="label" htmlFor="overlay-dept">
                  Department
                </label>
                <input
                  id="overlay-dept"
                  className="field"
                  value={form.department}
                  onChange={(e) => update('department', e.target.value)}
                  placeholder="e.g. Computer Science"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label" htmlFor="overlay-year">
                  Year of study
                </label>
                <select
                  id="overlay-year"
                  className="field appearance-none"
                  value={form.year}
                  onChange={(e) => update('year', e.target.value)}
                >
                  <option value="">Select your year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <fieldset className="mt-6">
              <legend className="label">Areas of interest</legend>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => {
                  const active = form.interests.includes(interest)
                  return (
                    <button
                      type="button"
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      aria-pressed={active}
                      className={`rounded-full border px-4 py-2 text-xs transition ${
                        active
                          ? 'border-sand/60 bg-sand/15 text-cream'
                          : 'border-cream/10 text-cream/55 hover:border-cream/30 hover:text-cream/80'
                      }`}
                    >
                      {interest}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-6">
              <label className="label" htmlFor="overlay-motivation">
                Why do you want to join?
              </label>
              <textarea
                id="overlay-motivation"
                className="field min-h-[100px] resize-y"
                value={form.motivation}
                onChange={(e) => update('motivation', e.target.value)}
                placeholder="A few honest lines are enough."
              />
            </div>

            <label className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-cream/55">
              <input
                type="checkbox"
                checked={form.agreed}
                onChange={(e) => update('agreed', e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-cream/30 bg-navy accent-sand"
                required
              />
              I have read and agree to the AUCIS code of conduct.
            </label>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Submit application'}
              {status !== 'sending' && <Icon name="arrowRight" size={16} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
