import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { postJson } from '../lib/api.js'
import { site } from '../data/site.js'

const initialForm = { name: '', email: '', subject: '', message: '' }

const CONTACT_EMAIL = site.email || 'aucisauk@gmail.com'
const CONTACT_SOCIALS =
  site.socials && site.socials.length > 0
    ? site.socials
    : [
        {
          label: 'Instagram',
          handle: '@aucis.au',
          href: 'https://www.instagram.com/aucis.au?xtok=MWtsMGdrbTNqdnVhaA==',
        },
      ]

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setStatus('sending')

    try {
      await postJson('/api/messages', form)
      setStatus('sent')
      setForm(initialForm)
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  return (
    <div className="contact-page min-h-screen">
      <div className="contact-divider border-b border-cream/10">
        <PageHeader
          eyebrow="AUCIS — Executive Secretariat"
          title="Connect with"
          accent="AUCIS."
          intro="The Air University Computing & Innovation Society (AUCIS) fosters technical excellence, research collaboration, and industry engagement across the campus community."
        />
      </div>

      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          {/* Left Column: Society Overview & Official Channels */}
          <div className="space-y-5">
            <Reveal>
              <div className="contact-card p-6">
                <span className="contact-pill inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  About the Society
                </span>
                <h2 className="contact-heading mt-4 text-xl font-semibold tracking-tight">
                  Advancing Computing &amp; Innovation
                </h2>
                <p className="contact-body mt-2.5 text-sm leading-relaxed">
                  AUCIS serves as the premier student-led computing body dedicated to software engineering, competitive programming, and emerging technologies. Reach out to our executive council regarding society membership, technical workshops, hackathons, or academic partnerships.
                </p>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="contact-card contact-card-hover p-6">
                <div className="flex items-start gap-4">
                  <span className="contact-icon-badge grid h-11 w-11 shrink-0 place-items-center rounded-xl">
                    <Icon name="mail" size={18} />
                  </span>
                  <div>
                    <h3 className="contact-heading text-base font-semibold">
                      Official Correspondence
                    </h3>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="contact-meta mt-1 inline-block text-sm font-medium underline underline-offset-4 transition"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="contact-card contact-card-hover p-6">
                <div className="flex items-start gap-4">
                  <span className="contact-icon-badge grid h-11 w-11 shrink-0 place-items-center rounded-xl">
                    <Icon name="pin" size={18} />
                  </span>
                  <div>
                    <h3 className="contact-heading text-base font-semibold">
                      Campus Headquarters
                    </h3>
                    <p className="contact-body mt-1 text-sm leading-relaxed">
                      {site.location.line1}
                      <br />
                      {site.location.line2}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="contact-card contact-card-hover p-6">
                <div className="flex items-start gap-4">
                  <span className="contact-icon-badge grid h-11 w-11 shrink-0 place-items-center rounded-xl">
                    <Icon name="instagram" size={18} />
                  </span>
                  <div>
                    <h3 className="contact-heading text-base font-semibold">
                      Digital Channels
                    </h3>
                    <ul className="mt-2.5 flex flex-wrap gap-2">
                      {CONTACT_SOCIALS.map((social) => (
                        <li key={social.label} className="flex flex-wrap items-center gap-2.5">
                          <span className="contact-meta text-sm font-medium">
                            {social.handle || '@aucis.au'}
                          </span>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            className="contact-social-link"
                          >
                            Open {social.label}
                            <Icon name="arrowUpRight" size={13} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Formal Inquiry Form */}
          <Reveal delay={100}>
            {status === 'sent' ? (
              <div className="contact-card p-8 sm:p-10">
                <span className="contact-icon-badge grid h-12 w-12 place-items-center rounded-full">
                  <Icon name="check" size={20} />
                </span>
                <p className="contact-meta mt-5 text-xs font-semibold uppercase tracking-widest">
                  Dispatch Confirmed
                </p>
                <h3 className="contact-heading mt-1 text-2xl font-semibold">
                  Your inquiry has been logged.
                </h3>
                <p className="contact-body mt-3 text-sm leading-relaxed">
                  Thank you for contacting the Air University Computing &amp; Innovation Society. A representative from our executive body will review your message and respond to your provided email address.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn-ghost mt-7"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="contact-card p-7 sm:p-9">
                <div className="contact-divider border-b border-cream/10 pb-5">
                  <span className="contact-meta text-xs font-semibold uppercase tracking-widest">
                    Direct Desk
                  </span>
                  <h2 className="contact-heading mt-1 text-2xl font-semibold">
                    Send an Official Message
                  </h2>
                  <p className="contact-body mt-1.5 text-sm">
                    Complete the form below to route your inquiry directly to the AUCIS Executive Committee.
                  </p>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="contact-label label" htmlFor="c-name">
                      Full Name
                    </label>
                    <input
                      id="c-name"
                      className="contact-field"
                      placeholder="e.g. Ayesha Khan"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="contact-label label" htmlFor="c-email">
                      Email Address
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      className="contact-field"
                      placeholder="name@students.au.edu.pk"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="contact-label label" htmlFor="c-subject">
                    Subject / Department
                  </label>
                  <input
                    id="c-subject"
                    className="contact-field"
                    value={form.subject}
                    onChange={(e) => update('subject', e.target.value)}
                    placeholder="Membership, Event Collaboration, Technical Query..."
                  />
                </div>

                <div className="mt-5">
                  <label className="contact-label label" htmlFor="c-message">
                    Detailed Message
                  </label>
                  <textarea
                    id="c-message"
                    className="contact-field min-h-[155px] resize-y"
                    placeholder="Provide context regarding your inquiry or proposal..."
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <div className="contact-card mt-4 px-4 py-3 text-sm font-medium text-sand">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="contact-submit mt-7 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? 'Transmitting Message…' : 'Message to AUCIS'}
                  {status !== 'sending' && <Icon name="arrowRight" size={16} />}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  )
}
