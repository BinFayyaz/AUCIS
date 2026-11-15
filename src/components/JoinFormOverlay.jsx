import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import RegistrationField from './RegistrationField.jsx'
import { postJson } from '../lib/api.js'
import { JOIN_SEQUENCE } from '../lib/joinSequence.js'
import { validateRegistration } from '../lib/registration.js'
import { codeOfConduct, groups, interests } from '../data/site.js'
import { saveForm, loadForm, clearForm, setApplied, hasApplied } from '../lib/secureStorage.js'
import './JoinRegistration.css'

const semesters = Array.from({ length: 12 }, (_, i) => `Semester ${i + 1}`)
const initialForm = {
  name: '', email: '', rollNumber: '', department: '', semester: '', group: '',
  interests: [], motivation: '', agreed: false,
}
const fields = [
  { name: 'name', label: 'Full name', placeholder: 'Your full name', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email', required: true, autoComplete: 'email' },
  { name: 'rollNumber', label: 'Roll number', placeholder: 'e.g. 240123' },
  { name: 'department', label: 'Department', placeholder: 'e.g. Computer Science' },
]

export default function JoinFormOverlay({ joinPhase, onError, onSuccess, onClose }) {
  const [form, setForm] = useState(() => {
    const saved = loadForm()
    return saved ? { ...initialForm, ...saved } : initialForm
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')
  const [showConduct, setShowConduct] = useState(false)
  const [alreadyApplied] = useState(() => hasApplied())
  const panelRef = useRef(null)
  const submitLock = useRef(false)
  const previouslyFocused = useRef(document.activeElement)
  const focused = useRef(false)
  const isActive = (joinPhase === 'form' || joinPhase === 'error') && !alreadyApplied
  const isFinishing = ['collecting', 'rolling', 'shrinking', 'holding'].includes(joinPhase)

  // Auto-save form data to encrypted local storage on every change
  useEffect(() => {
    if (!alreadyApplied) saveForm(form)
  }, [form, alreadyApplied])

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
      setApplied()
      clearForm()
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
          <div className="join-sheet">
            <div className="join-panel-content">
              {alreadyApplied ? (
                <div className="already-applied-state">
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-cream/10 bg-white/[0.03] text-sage">
                    <Icon name="check" size={28} />
                  </span>
                  <h2 id="join-title" className="mt-6 text-2xl sm:text-3xl">Already Applied</h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/55">
                    You've already submitted an application to join AUCIS. We'll be in touch
                    at the email you provided. If you think this is an error, contact the
                    executive body.
                  </p>
                  <button type="button" onClick={close} className="btn-primary mt-8">
                    Close
                  </button>
                </div>
              ) : (
                <>
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
                        <RegistrationField name="semester" label="Semester" errors={errors}>
                          <select id="overlay-semester" className="field appearance-none" value={form.semester} onChange={(event) => update('semester', event.target.value)} required aria-invalid={Boolean(errors.semester)} aria-describedby={errors.semester ? 'error-semester' : undefined}>
                            <option value="">Select your semester</option>
                            {semesters.map((sem) => <option key={sem} value={sem}>{sem}</option>)}
                          </select>
                        </RegistrationField>
                        <RegistrationField name="group" label="Group you want to join" errors={errors}>
                          <select id="overlay-group" className="field appearance-none" value={form.group} onChange={(event) => update('group', event.target.value)} required aria-invalid={Boolean(errors.group)} aria-describedby={errors.group ? 'error-group' : undefined}>
                            <option value="">Select a group</option>
                            {groups.map((group) => <option key={group} value={group}>{group}</option>)}
                          </select>
                        </RegistrationField>
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
                        <div className="flex items-start gap-3">
                          <input id="overlay-agreed" type="checkbox" checked={form.agreed} onChange={(event) => update('agreed', event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded border-cream/30 bg-navy accent-sand" required aria-invalid={Boolean(errors.agreed)} aria-describedby={errors.agreed ? 'error-agreed' : undefined} />
                          <span className="text-sm leading-relaxed text-cream/70">
                            I have read and agree to the{' '}
                            <button type="button" onClick={() => setShowConduct(true)} className="conduct-link">code of conduct</button>.
                          </span>
                        </div>
                        {errors.agreed && <p id="error-agreed" className="registration-error" role="alert">{errors.agreed}</p>}
                      </div>

                      {serverError && <p className="registration-error mt-4" role="alert">{serverError}</p>}
                      <button type="submit" disabled={status !== 'idle'} className="btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60">
                        {status === 'sending' ? 'Sending…' : 'Submit application'}
                        {status === 'idle' && <Icon name="arrowRight" size={16} />}
                      </button>
                    </fieldset>
                  </form>
                </>
              )}
            </div>
            <div className="join-paper-roll" aria-hidden="true"><span>AUCIS · APPLICATION</span></div>
          </div>
        </section>
      </div>
      {isFinishing && !alreadyApplied && <p className="join-success-caption" role="status">Application received. Safely in hand.</p>}

      {showConduct && (
        <div className="conduct-modal" role="dialog" aria-modal="true" aria-labelledby="conduct-title" onClick={() => setShowConduct(false)}>
          <div className="conduct-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="eyebrow"><span className="h-px w-8 bg-sand/50" />AUCIS</span>
                <h3 id="conduct-title" className="mt-3 text-xl sm:text-2xl">Code of Conduct</h3>
              </div>
              <button type="button" onClick={() => setShowConduct(false)} className="join-close" aria-label="Close code of conduct">
                <Icon name="close" size={16} />
              </button>
            </div>
            <ol className="conduct-list mt-5">
              {codeOfConduct.map((item, i) => (
                <li key={i}>
                  <span className="conduct-number">{i + 1}</span>
                  <span className="conduct-text">{item}</span>
                </li>
              ))}
            </ol>
            <button type="button" onClick={() => setShowConduct(false)} className="btn-ghost mt-6">
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
