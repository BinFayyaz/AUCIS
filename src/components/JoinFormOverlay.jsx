import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import RegistrationField from './RegistrationField.jsx'
import { postJson } from '../lib/api.js'
import { JOIN_SEQUENCE } from '../lib/joinSequence.js'
import { validateRegistration } from '../lib/registration.js'
import { interests } from '../data/site.js'
import './JoinRegistration.css'

const years = ['1st year', '2nd year', '3rd year', '4th year', 'Postgraduate']
const initialForm = {
  name: '', email: '', rollNumber: '', department: '', year: '',
  interests: [], motivation: '', agreed: false,
}
const fields = [
  { name: 'name', label: 'Full name', placeholder: 'Your full name', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email', required: true, autoComplete: 'email' },
  { name: 'rollNumber', label: 'Roll number', placeholder: 'e.g. 240123' },
  { name: 'department', label: 'Department', placeholder: 'e.g. Computer Science' },
]

export default function JoinFormOverlay({ joinPhase, onError, onSuccess, onClose }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')
  const panelRef = useRef(null)
  const submitLock = useRef(false)
  const previouslyFocused = useRef(document.activeElement)
  const focused = useRef(false)
  const isActive = joinPhase === 'form' || joinPhase === 'error'
  const isFinishing = ['collecting', 'rolling', 'shrinking', 'holding'].includes(joinPhase)

  useEffect(() => {
    if (isActive && !focused.current) {
      panelRef.current?.querySelector('input')?.focus({ preventScroll: true })
      focused.current = true
    }
  }, [isActive])

  useEffect(() => () => {
    if (previouslyFocused.current?.isConnected) previouslyFocused.current.focus({ preventScroll: true })
  }, [])

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    const remaining = { ...errors }
    delete remaining[key]
    setErrors(remaining)
    setServerError('')
    onError(Object.keys(remaining).length > 0)
  }

  const toggleInterest = (interest) => update('interests', form.interests.includes(interest)
    ? form.interests.filter((item) => item !== interest)
    : [...form.interests, interest])

  const onSubmit = async (event) => {
    event.preventDefault()
    if (submitLock.current || !isActive) return
    const nextErrors = validateRegistration(form)
    setErrors(nextErrors)
    setServerError('')
    if (Object.keys(nextErrors).length) {
      onError(true)
      const firstField = Object.keys(nextErrors)[0]
      panelRef.current?.querySelector(`#overlay-${firstField}`)?.focus()
      return
    }
    onError(false)
    submitLock.current = true
    setStatus('sending')
    try {
      const { agreed, ...application } = form
      await postJson('/api/applications', application)
      setStatus('sent')
      onSuccess()
    } catch (error) {
      setServerError(error.message)
      setStatus('idle')
      submitLock.current = false
      onError(true)
    }
  }

  const close = () => {
    if (status !== 'sending' && !isFinishing) onClose()
  }

  const onKeyDown = (event) => {
    if (event.key === 'Escape') { event.preventDefault(); close(); return }
    if (event.key !== 'Tab') return
    const controls = panelRef.current?.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled)')
    if (!controls?.length) return
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }

  if (joinPhase === 'holding') {
    return (
      <div className="join-confirmation" role="status">
        <Icon name="check" size={20} className="shrink-0 text-sage" />
        <div><strong>Application received.</strong><p>Thank you! We'll be in touch at the email you provided.</p></div>
        <button type="button" onClick={onClose} aria-label="Dismiss confirmation"><Icon name="close" size={16} /></button>
      </div>
    )
  }

  return (
    <div className="join-overlay" data-phase={joinPhase} onKeyDown={onKeyDown}>
      <div className="join-backdrop" onClick={close} />
      <div className="join-layout">
        <section
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="join-title"
          aria-busy={!isActive || status === 'sending'}
          className="join-panel"
          style={{ '--join-slide': `${JOIN_SEQUENCE[joinPhase]?.panel ?? 100}%` }}
        >
          <div className="join-panel-content">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="eyebrow"><span className="h-px w-8 bg-sand/50" />Application</span>
                <h2 id="join-title" className="mt-3 text-2xl sm:text-3xl">Join AUCIS</h2>
              </div>
              <button type="button" onClick={close} disabled={status === 'sending' || isFinishing} className="join-close" aria-label="Close registration">
                <Icon name="close" size={16} />
              </button>
            </div>

            <form onSubmit={onSubmit} noValidate className="mt-6">
              <fieldset disabled={!isActive || status !== 'idle'}>
                <div className="grid gap-5 sm:grid-cols-2">
                  {fields.map((field) => (
                    <RegistrationField key={field.name} name={field.name} label={field.label} errors={errors}>
                      <input
                        id={`overlay-${field.name}`}
                        type={field.type || 'text'}
                        autoComplete={field.autoComplete}
                        className="field"
                        value={form[field.name]}
                        onChange={(event) => update(field.name, event.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        aria-invalid={Boolean(errors[field.name])}
                        aria-describedby={errors[field.name] ? `error-${field.name}` : undefined}
                      />
                    </RegistrationField>
                  ))}
                  <div className="sm:col-span-2">
                    <RegistrationField name="year" label="Year of study" errors={errors}>
                      <select id="overlay-year" className="field appearance-none" value={form.year} onChange={(event) => update('year', event.target.value)} required aria-invalid={Boolean(errors.year)} aria-describedby={errors.year ? 'error-year' : undefined}>
                        <option value="">Select your year</option>
                        {years.map((year) => <option key={year} value={year}>{year}</option>)}
                      </select>
                    </RegistrationField>
                  </div>
                </div>

                <fieldset className="mt-6">
                  <legend className="label">Areas of interest</legend>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <button type="button" key={interest} onClick={() => toggleInterest(interest)} aria-pressed={form.interests.includes(interest)} className={`rounded-full border px-4 py-2 text-xs transition ${form.interests.includes(interest) ? 'border-sand/60 bg-sand/15 text-cream' : 'border-cream/10 text-cream/55 hover:border-cream/30 hover:text-cream/80'}`}>{interest}</button>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-6">
                  <label className="label" htmlFor="overlay-motivation">Why do you want to join?</label>
                  <textarea id="overlay-motivation" className="field min-h-[100px] resize-y" value={form.motivation} onChange={(event) => update('motivation', event.target.value)} placeholder="A few honest lines are enough." />
                </div>

                <div className="registration-field mt-6" data-invalid={errors.agreed ? 'true' : undefined}>
                  <label className="flex items-start gap-3 text-sm leading-relaxed text-cream/70" htmlFor="overlay-agreed">
                    <input id="overlay-agreed" type="checkbox" checked={form.agreed} onChange={(event) => update('agreed', event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded border-cream/30 bg-navy accent-sand" required aria-invalid={Boolean(errors.agreed)} aria-describedby={errors.agreed ? 'error-agreed' : undefined} />
                    I have read and agree to the AUCIS code of conduct.
                  </label>
                  {errors.agreed && <p id="error-agreed" className="registration-error" role="alert">{errors.agreed}</p>}
                </div>

                {serverError && <p className="registration-error mt-4" role="alert">{serverError}</p>}
                <button type="submit" disabled={status !== 'idle'} className="btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60">
                  {status === 'sending' ? 'Sending…' : 'Submit application'}
                  {status === 'idle' && <Icon name="arrowRight" size={16} />}
                </button>
              </fieldset>
            </form>
          </div>
          <div className="join-paper-roll" aria-hidden="true"><span>AUCIS · APPLICATION</span></div>
        </section>
      </div>
      {isFinishing && <p className="join-success-caption" role="status">Application received. Safely in hand.</p>}
    </div>
  )
}
