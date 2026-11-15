import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { postJson } from '../lib/api.js'
import { site } from '../data/site.js'

const initialForm = { name: '', email: '', subject: '', message: '' }

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
        eyebrow="Contact"
        title="Say"
        accent="hello."
        intro="Questions about membership, events or collaborations? Reach the executive body."
      />

      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-4">
            <Reveal>
              <div className="surface p-6">
                <span className="contact-icon grid h-11 w-11 place-items-center rounded-full border border-cream/10 text-sand/80">
                  <Icon name="mail" size={18} />
                </span>
                <h2 className="mt-5 text-xl">Email</h2>
                {site.email ? (
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-2 inline-block text-sm text-cream/60 transition hover:text-cream"
                  >
                    {site.email}
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-cream/40">
                    The official address is being set up — use the form and we will reply.
                  </p>
                )}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="surface p-6">
                <span className="contact-icon grid h-11 w-11 place-items-center rounded-full border border-cream/10 text-sand/80">
                  <Icon name="pin" size={18} />
                </span>
                <h2 className="mt-5 text-xl">Campus</h2>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">
                  {site.location.line1}
                  <br />
                  {site.location.line2}
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="surface p-6">
                <span className="contact-icon grid h-11 w-11 place-items-center rounded-full border border-cream/10 text-sand/80">
                  <Icon name="instagram" size={18} />
                </span>
                <h2 className="mt-5 text-xl">Social</h2>
                {site.socials.length === 0 ? (
                  <p className="mt-2 text-sm text-cream/40">
                    Our social accounts are being created. Links will appear here.
                  </p>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {site.socials.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-cream/60 transition hover:text-cream"
                        >
                          {social.label}
                          <Icon name="arrowUpRight" size={13} />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            {status === 'sent' ? (
              <div className="surface p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-sage/40 bg-sage/10 text-sage">
                  <Icon name="check" size={20} />
                </span>
                <h3 className="mt-5 text-2xl">Message sent.</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/55">
                  Thanks for reaching out. We will reply to the email address you provided.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn-ghost mt-6 text-[13px]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="surface p-6 sm:p-8">
                <h2 className="text-2xl">Send a message</h2>
                <p className="mt-2 text-sm text-cream/45">
                  Fill this in and the executive body will get back to you.
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="c-name">
                      Name
                    </label>
                    <input
                      id="c-name"
                      className="field"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="c-email">
                      Email
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      className="field"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="label" htmlFor="c-subject">
                    Subject
                  </label>
                  <input
                    id="c-subject"
                    className="field"
                    value={form.subject}
                    onChange={(e) => update('subject', e.target.value)}
                    placeholder="What is this about?"
                  />
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
                    required
                  />
                </div>

                {error && <p className="contact-error mt-4 text-sm text-red-300/90">{error}</p>}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
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
