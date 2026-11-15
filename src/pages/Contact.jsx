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
    <div className="min-h-screen bg-[#F4F1DE] text-[#0D1B2A] selection:bg-[#415A77] selection:text-[#F4F1DE]">
      <div className="border-b border-[#D4C4A8] bg-[#F4F1DE]">
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
              <div className="rounded-2xl border border-[#D4C4A8] bg-[#F4F1DE] p-6 shadow-sm">
                <span className="inline-block rounded-full border border-[#778D7A]/40 bg-[#778D7A]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0D1B2A]">
                  About the Society
                </span>
                <h2 className="mt-4 text-xl font-semibold tracking-tight text-[#0D1B2A]">
                  Advancing Computing &amp; Innovation
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-[#1B263B]">
                  AUCIS serves as the premier student-led computing body dedicated to software engineering, competitive programming, and emerging technologies. Reach out to our executive council regarding society membership, technical workshops, hackathons, or academic partnerships.
                </p>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="rounded-2xl border border-[#D4C4A8] bg-[#F4F1DE] p-6 shadow-sm transition-colors hover:border-[#415A77]">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#D4C4A8] bg-[#D4C4A8]/25 text-[#415A77]">
                    <Icon name="mail" size={18} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#0D1B2A]">Official Correspondence</h3>
                    {site.email ? (
                      <a
                        href={`mailto:${site.email}`}
                        className="mt-1 inline-block text-sm font-medium text-[#415A77] underline decoration-[#D4C4A8] underline-offset-4 transition hover:text-[#0D1B2A]"
                      >
                        {site.email}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm leading-relaxed text-[#1B263B]">
                        Our institutional mailing desk is being finalized. Please submit your inquiry via the official form for a prompt response.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-2xl border border-[#D4C4A8] bg-[#F4F1DE] p-6 shadow-sm transition-colors hover:border-[#415A77]">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#D4C4A8] bg-[#D4C4A8]/25 text-[#415A77]">
                    <Icon name="pin" size={18} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#0D1B2A]">Campus Headquarters</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#1B263B]">
                      {site.location.line1}
                      <br />
                      {site.location.line2}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="rounded-2xl border border-[#D4C4A8] bg-[#F4F1DE] p-6 shadow-sm transition-colors hover:border-[#415A77]">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#D4C4A8] bg-[#D4C4A8]/25 text-[#778D7A]">
                    <Icon name="instagram" size={18} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#0D1B2A]">Digital Channels</h3>
                    {site.socials.length === 0 ? (
                      <p className="mt-1 text-sm leading-relaxed text-[#1B263B]">
                        Official AUCIS community portals and announcement channels are currently being indexed and will be published shortly.
                      </p>
                    ) : (
                      <ul className="mt-2.5 flex flex-wrap gap-2">
                        {site.socials.map((social) => (
                          <li key={social.label}>
                            <a
                              href={social.href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-[#D4C4A8] bg-[#D4C4A8]/20 px-3 py-1.5 text-xs font-medium text-[#0D1B2A] transition hover:border-[#415A77] hover:bg-[#415A77] hover:text-[#F4F1DE]"
                            >
                              {social.label}
                              <Icon name="arrowUpRight" size={13} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Formal Inquiry Form */}
          <Reveal delay={100}>
            {status === 'sent' ? (
              <div className="rounded-2xl border border-[#778D7A] bg-[#F4F1DE] p-8 sm:p-10 shadow-sm">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-[#778D7A] bg-[#778D7A]/20 text-[#0D1B2A]">
                  <Icon name="check" size={20} />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-[#778D7A]">
                  Dispatch Confirmed
                </p>
                <h3 className="mt-1 text-2xl font-semibold text-[#0D1B2A]">
                  Your inquiry has been logged.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#1B263B]">
                  Thank you for contacting the Air University Computing &amp; Innovation Society. A representative from our executive body will review your message and respond to your provided email address.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl border border-[#415A77] bg-transparent px-5 py-2.5 text-sm font-medium text-[#0D1B2A] transition hover:bg-[#415A77] hover:text-[#F4F1DE]"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="rounded-2xl border border-[#D4C4A8] bg-[#F4F1DE] p-7 sm:p-9 shadow-sm"
              >
                <div className="border-b border-[#D4C4A8] pb-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#415A77]">
                    Direct Desk
                  </span>
                  <h2 className="mt-1 text-2xl font-semibold text-[#0D1B2A]">
                    Send an Official Message
                  </h2>
                  <p className="mt-1.5 text-sm text-[#1B263B]">
                    Complete the form below to route your inquiry directly to the AUCIS Executive Committee.
                  </p>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1B263B]"
                      htmlFor="c-name"
                    >
                      Full Name
                    </label>
                    <input
                      id="c-name"
                      className="w-full rounded-xl border border-[#D4C4A8] bg-[#F4F1DE] px-4 py-2.5 text-sm text-[#0D1B2A] placeholder-[#415A77]/60 outline-none transition focus:border-[#415A77] focus:ring-2 focus:ring-[#415A77]/20"
                      placeholder="e.g. Ayesha Khan"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1B263B]"
                      htmlFor="c-email"
                    >
                      Email Address
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      className="w-full rounded-xl border border-[#D4C4A8] bg-[#F4F1DE] px-4 py-2.5 text-sm text-[#0D1B2A] placeholder-[#415A77]/60 outline-none transition focus:border-[#415A77] focus:ring-2 focus:ring-[#415A77]/20"
                      placeholder="name@students.au.edu.pk"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1B263B]"
                    htmlFor="c-subject"
                  >
                    Subject / Department
                  </label>
                  <input
                    id="c-subject"
                    className="w-full rounded-xl border border-[#D4C4A8] bg-[#F4F1DE] px-4 py-2.5 text-sm text-[#0D1B2A] placeholder-[#415A77]/60 outline-none transition focus:border-[#415A77] focus:ring-2 focus:ring-[#415A77]/20"
                    value={form.subject}
                    onChange={(e) => update('subject', e.target.value)}
                    placeholder="Membership, Event Collaboration, Technical Query..."
                  />
                </div>

                <div className="mt-5">
                  <label
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1B263B]"
                    htmlFor="c-message"
                  >
                    Detailed Message
                  </label>
                  <textarea
                    id="c-message"
                    className="min-h-[155px] w-full resize-y rounded-xl border border-[#D4C4A8] bg-[#F4F1DE] px-4 py-3 text-sm text-[#0D1B2A] placeholder-[#415A77]/60 outline-none transition focus:border-[#415A77] focus:ring-2 focus:ring-[#415A77]/20"
                    placeholder="Provide context regarding your inquiry or proposal..."
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <div className="mt-4 rounded-xl border border-[#0D1B2A] bg-[#D4C4A8]/35 px-4 py-3 text-sm font-medium text-[#0D1B2A]">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D1B2A] px-6 py-3.5 text-sm font-semibold tracking-wide text-[#F4F1DE] transition hover:bg-[#1B263B] focus:outline-none focus:ring-2 focus:ring-[#415A77] focus:ring-offset-2 focus:ring-offset-[#F4F1DE] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? 'Transmitting Message…' : 'Transmit Message to AUCIS'}
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
