import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { postJson } from '../lib/api.js'
import { codeOfConduct, interests, memberBenefits } from '../data/site.js'

const eligibility = [
  { title: 'Any enrolled student', text: 'Undergraduate or postgraduate, any semester at Air University Kamra.' },
  { title: 'Every department', text: 'Computing, engineering, business — the best teams are mixed.' },
  { title: 'No experience required', text: 'Beginners are welcome. Curiosity is the only prerequisite.' },
  { title: 'Attendance matters', text: 'Members are expected to take part in the events they sign up for.' },
]

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

export default function Join() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const toggleInterest = (interest) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest],
    }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
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
      setForm(initialForm)
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Join us"
        title="Apply to"
        accent="AUCIS."
        intro="Applications are open to every student at Air University Kamra. Tell us a little about yourself and the executive body will get back to you."
      />

      {/* Who can join */}
      <section className="container-page py-16">
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-8 bg-sand/50" />
            Who can join
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl">Almost certainly you.</h2>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {eligibility.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="surface surface-hover h-full p-6">
                <h3 className="flex items-center gap-2 text-lg">
                  <Icon name="check" size={16} className="text-sage" />
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/50">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Benefits + conduct */}
      <section className="relative border-y border-cream/5 bg-navy/25 py-18">
        <div className="container-page grid gap-12 py-6 md:grid-cols-2">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-8 bg-sand/50" />
              Member benefits
            </span>
            <h2 className="mt-5 text-2xl sm:text-3xl">What you get out of it</h2>
            <ul className="mt-6 space-y-3">
              {memberBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm leading-relaxed text-cream/60">
                  <Icon name="star" size={15} className="mt-0.5 shrink-0 text-sand/70" />
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <span className="eyebrow">
              <span className="h-px w-8 bg-sand/50" />
              Code of conduct
            </span>
            <h2 className="mt-5 text-2xl sm:text-3xl">How we work together</h2>
            <ul className="mt-6 space-y-3">
              {codeOfConduct.map((rule) => (
                <li key={rule} className="flex items-start gap-3 text-sm leading-relaxed text-cream/60">
                  <Icon name="shield" size={15} className="mt-0.5 shrink-0 text-sage/80" />
                  {rule}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Application form */}
      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-8 bg-sand/50" />
              Application
            </span>
            <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">
              Your <span className="italic text-sand/90">application</span>.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/50">
              It takes two minutes. We read every application and reply to each one.
            </p>
          </Reveal>

          <Reveal delay={120}>
            {status === 'sent' ? (
              <div className="surface p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-sage/40 bg-sage/10 text-sage">
                  <Icon name="check" size={20} />
                </span>
                <h3 className="mt-5 text-2xl">Application received.</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/55">
                  Thank you for applying to AUCIS. The executive body will be in touch at the email
                  address you gave us.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn-ghost mt-6 text-[13px]"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="surface p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="name">
                      Full name
                    </label>
                    <input
                      id="name"
                      className="field"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="field"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="rollNumber">
                      Roll number
                    </label>
                    <input
                      id="rollNumber"
                      className="field"
                      value={form.rollNumber}
                      onChange={(e) => update('rollNumber', e.target.value)}
                      placeholder="e.g. 240123"
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="department">
                      Department
                    </label>
                    <input
                      id="department"
                      className="field"
                      value={form.department}
                      onChange={(e) => update('department', e.target.value)}
                      placeholder="e.g. Computer Science"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label" htmlFor="year">
                      Year of study
                    </label>
                    <select
                      id="year"
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
                  <label className="label" htmlFor="motivation">
                    Why do you want to join?
                  </label>
                  <textarea
                    id="motivation"
                    className="field min-h-[120px] resize-y"
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

                {error && <p className="mt-4 text-sm text-red-300/90">{error}</p>}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending…' : 'Submit application'}
                  {status !== 'sending' && <Icon name="arrowRight" size={16} />}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
