import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { postJson } from '../lib/api.js'
import { site } from '../data/site.js'

const initialForm = { name: '', email: '', subject: '', message: '' }

const inquiryGuidance = {
  Membership: 'Tell us what you are interested in learning or building with AUCIS.',
  'Events & workshops': 'Share the event or topic you have in mind, and any dates that work for you.',
  Collaboration: 'Let us know who you represent and what a successful collaboration could look like.',
  'Projects & competitions': 'Include the project, competition, or technical area you would like to discuss.',
  Other: 'A few details will help the AUCIS executive body direct your message.',
}

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
    <div className="contact-page">
      <PageHeader
        eyebrow="Contact the society"
        title="Connect with"
        accent="AUCIS."
        intro="Have a question, an idea, or a project in mind? Start a conversation with the Air University Kamra student computing and innovation society."
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div className="space-y-5">
            <Reveal>
              <article className="contact-feature relative overflow-hidden rounded-2xl p-7 sm:p-8">
                <div className="contact-feature-glow pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full blur-3xl" />
                <div className="relative">
                  <span className="eyebrow text-sand/90">
                    <span className="h-px w-8 bg-sand/70" />
                    A student-led community
                  </span>
                  <h2 className="mt-5 max-w-sm text-2xl leading-tight text-cream sm:text-3xl">
                    Ideas become skills when we build together.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-cream/70">
                    AUCIS brings curious students together to explore computing, exchange knowledge
                    and turn classroom concepts into practical work. From workshops and technical
                    projects to competitions and peer learning, there is room to contribute at every
                    experience level.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['Learn', 'Build', 'Compete', 'Collaborate'].map((value) => (
                      <span
                        key={value}
                        className="rounded-full border border-cream/20 bg-cream/[0.06] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-cream/75"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <Reveal delay={70}>
                <article className="surface surface-hover flex h-full gap-4 p-5">
                  <span className="contact-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cream/10 text-sand">
                    <Icon name="mail" size={18} />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-base">Email</h2>
                    {site.email ? (
                      <a
                        href={`mailto:${site.email}`}
                        className="mt-1 inline-block break-all text-sm text-cream/60 transition hover:text-sand"
                      >
                        {site.email}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm leading-relaxed text-cream/55">
                        The official address is being arranged. Please use the message form for now.
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>

              <Reveal delay={130}>
                <article className="surface surface-hover flex h-full gap-4 p-5">
                  <span className="contact-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cream/10 text-sage">
                    <Icon name="pin" size={18} />
                  </span>
                  <div>
                    <h2 className="text-base">Find us</h2>
                    <p className="mt-1 text-sm leading-relaxed text-cream/55">
                      {site.location.line1}
                      <br />
                      {site.location.line2}
                    </p>
                  </div>
                </article>
              </Reveal>
            </div>

            <Reveal delay={190}>
              <article className="surface surface-hover flex gap-4 p-5">
                <span className="contact-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cream/10 text-steel">
                  <Icon name="users" size={18} />
                </span>
                <div>
                  <h2 className="text-base">Stay connected</h2>
                  {site.socials.length === 0 ? (
                    <p className="mt-1 text-sm leading-relaxed text-cream/55">
                      AUCIS social channels will be listed here as they become available. Send us a
                      note to hear about membership, events, or ways to get involved.
                    </p>
                  ) : (
                    <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                      {site.socials.map((social) => (
                        <li key={social.label}>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-cream/60 transition hover:text-sand"
                          >
                            {social.label}
                            <Icon name="arrowUpRight" size={13} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          </div>

          <Reveal delay={100}>
            {status === 'sent' ? (
              <div className="contact-form-panel surface p-7 sm:p-9">
                <span className="contact-success-icon grid h-12 w-12 place-items-center rounded-full border border-sage/40 bg-sage/10 text-sage">
                  <Icon name="check" size={20} />
                </span>
                <span className="eyebrow mt-6">Received by AUCIS</span>
                <h2 className="mt-3 text-2xl sm:text-3xl">Thank you for reaching out.</h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream/60">
                  Your message has been sent to the society. The executive body can use the details
                  you provided to direct your inquiry and reply.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn-ghost mt-7 text-[13px]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="contact-form-panel surface p-6 sm:p-9">
                <div className="flex items-start gap-4">
                  <span className="contact-form-mark grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sand">
                    <Icon name="mail" size={19} />
                  </span>
                  <div>
                    <span className="eyebrow">Get in touch</span>
                    <h2 className="mt-1 text-2xl sm:text-3xl">Send an inquiry</h2>
                    <p className="mt-2 text-sm leading-relaxed text-cream/55">
                      A little context helps us connect your message with the right people.
                    </p>
                  </div>
                </div>

                <div className="contact-form-rule my-7 h-px" />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="c-name">
                      Full name
                    </label>
                    <input
                      id="c-name"
                      className="field"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="c-email">
                      Email address
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      className="field"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="label" htmlFor="c-subject">
                    I am reaching out about
                  </label>
                  <select
                    id="c-subject"
                    className="field"
                    value={form.subject}
                    onChange={(e) => update('subject', e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select an inquiry type
                    </option>
                    {Object.keys(inquiryGuidance).map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5">
                  <label className="label" htmlFor="c-message">
                    Message
                  </label>
                  <textarea
                    id="c-message"
                    className="field min-h-[150px] resize-y"
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    placeholder={
                      inquiryGuidance[form.subject] ??
                      'Introduce yourself and tell us how the AUCIS team can help.'
                    }
                    required
                  />
                  <p className="mt-2 text-xs leading-relaxed text-cream/40" aria-live="polite">
                    {inquiryGuidance[form.subject] ??
                      'Choose a topic for a useful prompt, then share the details of your inquiry.'}
                  </p>
                </div>

                {error && (
                  <p className="contact-error mt-4 text-sm" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending inquiry…' : 'Send inquiry'}
                  {status !== 'sending' && <Icon name="arrowRight" size={16} />}
                </button>
                <p className="mt-4 text-center text-xs text-cream/40">
                  Please share only information relevant to your inquiry.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  )
}
