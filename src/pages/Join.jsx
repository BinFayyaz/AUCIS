
import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
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

// Only these characters are allowed in each field.
const cleanName = (value) =>
  value.replace(/[^\p{L}\p{M}\s.'’-]/gu, '')

const cleanRollNumber = (value) =>
  value.replace(/[^A-Za-z0-9/-]/g, '').slice(0, 20)

const cleanDepartment = (value) =>
  value.replace(/[^\p{L}\p{M}0-9\s&()./-]/gu, '').slice(0, 80)

const validateField = (key, value) => {
  switch (key) {
    case 'name': {
      const name = value.trim()

      if (!name) return 'Please enter your full name.'
      if (name.length < 2) return 'Your name must contain at least 2 characters.'
      if (!/^[\p{L}\p{M}]+(?:[ .'-][\p{L}\p{M}]+)*$/u.test(name)) {
        return 'Use letters only, with spaces, hyphens, apostrophes or periods.'
      }
      return ''
    }

    case 'email': {
      const email = value.trim()

      if (!email) return 'Please enter your email address.'
      if (email.length > 254) return 'Email address is too long.'
      if (!/^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i.test(email)) {
        return 'Please enter a valid email address, e.g. name@example.com.'
      }
      return ''
    }

    case 'rollNumber': {
      const roll = value.trim()

      if (!roll) return 'Please enter your roll number.'
      if (!/^[A-Za-z0-9/-]{4,20}$/.test(roll)) {
        return 'Use 4–20 characters: letters, numbers, hyphens or slashes.'
      }
      return ''
    }

    case 'department': {
      const department = value.trim()

      if (!department) return 'Please enter your department.'
      if (department.length < 2) return 'Department name must contain at least 2 characters.'
      if (!/[\p{L}\p{M}]/u.test(department)) {
        return 'Department name must contain letters.'
      }
      if (!/^[\p{L}\p{M}0-9\s&()./-]+$/u.test(department)) {
        return 'Please remove unsupported characters from the department name.'
      }
      return ''
    }

    case 'year':
      if (!years.includes(value)) return 'Please select a valid year of study.'
      return ''

    case 'interests':
      if (!Array.isArray(value) || value.length === 0) {
        return 'Please select at least one area of interest.'
      }
      if (!value.every((item) => interests.includes(item))) {
        return 'Please select valid areas of interest.'
      }
      return ''

    case 'motivation': {
      const motivation = value.trim()

      if (!motivation) return 'Please tell us why you want to join.'
      if (motivation.length < 20) return 'Please write at least 20 characters.'
      if (motivation.length > 1000) return 'Please keep your answer under 1,000 characters.'
      return ''
    }

    case 'agreed':
      if (value !== true) return 'You must agree to the code of conduct.'
      return ''

    default:
      return ''
  }
}

export default function Join() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))

    // Clear the previous error while the user corrects the field.
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const checkField = (key, value) => {
    const error = validateField(key, value)
    setErrors((prev) => ({ ...prev, [key]: error }))
  }

  const toggleInterest = (interest) => {
    const updatedInterests = form.interests.includes(interest)
      ? form.interests.filter((item) => item !== interest)
      : [...form.interests, interest]

    update('interests', updatedInterests)
  }

  const validateForm = () => {
    const newErrors = {}

    Object.entries(form).forEach(([key, value]) => {
      const error = validateField(key, value)

      if (error) {
        newErrors[key] = error
      }
    })

    return newErrors
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setStatus('idle')
      return
    }

    // Frontend validation only. No application is sent or saved yet.
    setStatus('validated')
  }

  const startAnother = () => {
    setForm(initialForm)
    setErrors({})
    setStatus('idle')
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
                <p className="mt-2 text-sm leading-relaxed text-cream/50">
                  {item.text}
                </p>
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
            <h2 className="mt-5 text-2xl sm:text-3xl">
              What you get out of it
            </h2>
            <ul className="mt-6 space-y-3">
              {memberBenefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-sm leading-relaxed text-cream/60"
                >
                  <Icon
                    name="star"
                    size={15}
                    className="mt-0.5 shrink-0 text-sand/70"
                  />
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
            <h2 className="mt-5 text-2xl sm:text-3xl">
              How we work together
            </h2>
            <ul className="mt-6 space-y-3">
              {codeOfConduct.map((rule) => (
                <li
                  key={rule}
                  className="flex items-start gap-3 text-sm leading-relaxed text-cream/60"
                >
                  <Icon
                    name="shield"
                    size={15}
                    className="mt-0.5 shrink-0 text-sage/80"
                  />
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
            {status === 'validated' ? (
              <div className="surface p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-sage/40 bg-sage/10 text-sage">
                  <Icon name="check" size={20} />
                </span>

                <h3 className="mt-5 text-2xl">
                  Form validated successfully.
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-cream/55">
                  All your information looks valid. However, the application
                  has not been submitted or saved because the AUCIS backend
                  is not connected yet.
                </p>

                <button
                  type="button"
                  onClick={startAnother}
                  className="btn-ghost mt-6 text-[13px]"
                >
                  Fill another application
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="surface p-6 sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Full name */}
                  <div>
                    <label className="label" htmlFor="name">
                      Full name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="field"
                      value={form.name}
                      onChange={(e) => update('name', cleanName(e.target.value))}
                      onBlur={() => checkField('name', form.name)}
                      placeholder="Your full name"
                      autoComplete="name"
                      maxLength={80}
                      required
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-2 text-xs text-red-300">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="label" htmlFor="email">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="field"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      onBlur={() => checkField('email', form.email)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      maxLength={254}
                      required
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-2 text-xs text-red-300">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Roll number */}
                  <div>
                    <label className="label" htmlFor="rollNumber">
                      Roll number *
                    </label>
                    <input
                      id="rollNumber"
                      name="rollNumber"
                      type="text"
                      className="field"
                      value={form.rollNumber}
                      onChange={(e) =>
                        update('rollNumber', cleanRollNumber(e.target.value))
                      }
                      onBlur={() => checkField('rollNumber', form.rollNumber)}
                      placeholder="e.g. 240123"
                      autoComplete="off"
                      maxLength={20}
                      required
                      aria-invalid={!!errors.rollNumber}
                      aria-describedby={
                        errors.rollNumber ? 'rollNumber-error' : undefined
                      }
                    />
                    {errors.rollNumber && (
                      <p
                        id="rollNumber-error"
                        className="mt-2 text-xs text-red-300"
                      >
                        {errors.rollNumber}
                      </p>
                    )}
                  </div>

                  {/* Department */}
                  <div>
                    <label className="label" htmlFor="department">
                      Department *
                    </label>
                    <input
                      id="department"
                      name="department"
                      type="text"
                      className="field"
                      value={form.department}
                      onChange={(e) =>
                        update('department', cleanDepartment(e.target.value))
                      }
                      onBlur={() => checkField('department', form.department)}
                      placeholder="e.g. Computer Science"
                      maxLength={80}
                      required
                      aria-invalid={!!errors.department}
                      aria-describedby={
                        errors.department ? 'department-error' : undefined
                      }
                    />
                    {errors.department && (
                      <p
                        id="department-error"
                        className="mt-2 text-xs text-red-300"
                      >
                        {errors.department}
                      </p>
                    )}
                  </div>

                  {/* Year */}
                  <div className="sm:col-span-2">
                    <label className="label" htmlFor="year">
                      Year of study *
                    </label>
                    <select
                      id="year"
                      name="year"
                      className="field appearance-none"
                      value={form.year}
                      onChange={(e) => update('year', e.target.value)}
                      onBlur={() => checkField('year', form.year)}
                      required
                      aria-invalid={!!errors.year}
                      aria-describedby={errors.year ? 'year-error' : undefined}
                    >
                      <option value="">Select your year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {errors.year && (
                      <p id="year-error" className="mt-2 text-xs text-red-300">
                        {errors.year}
                      </p>
                    )}
                  </div>
                </div>

                {/* Areas of interest */}
                <fieldset className="mt-6">
                  <legend className="label">
                    Areas of interest *
                  </legend>

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

                  {errors.interests && (
                    <p className="mt-2 text-xs text-red-300">
                      {errors.interests}
                    </p>
                  )}
                </fieldset>

                {/* Motivation */}
                <div className="mt-6">
                  <label className="label" htmlFor="motivation">
                    Why do you want to join? *
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    className="field min-h-[120px] resize-y"
                    value={form.motivation}
                    onChange={(e) => update('motivation', e.target.value)}
                    onBlur={() => checkField('motivation', form.motivation)}
                    placeholder="A few honest lines are enough."
                    minLength={20}
                    maxLength={1000}
                    required
                    aria-invalid={!!errors.motivation}
                    aria-describedby={
                      errors.motivation ? 'motivation-error' : 'motivation-count'
                    }
                  />

                  <div className="mt-2 flex items-center justify-between">
                    {errors.motivation ? (
                      <p
                        id="motivation-error"
                        className="text-xs text-red-300"
                      >
                        {errors.motivation}
                      </p>
                    ) : (
                      <span className="text-xs text-cream/35">
                        Minimum 20 characters
                      </span>
                    )}

                    <span
                      id="motivation-count"
                      className="text-xs text-cream/35"
                    >
                      {form.motivation.length}/1000
                    </span>
                  </div>
                </div>

                {/* Code of conduct agreement */}
                <div className="mt-6">
                  <label className="flex items-start gap-3 text-sm leading-relaxed text-cream/55">
                    <input
                      type="checkbox"
                      name="agreed"
                      checked={form.agreed}
                      onChange={(e) => update('agreed', e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-cream/30 bg-navy accent-sand"
                      required
                    />
                    I have read and agree to the AUCIS code of conduct.
                  </label>

                  {errors.agreed && (
                    <p className="mt-2 text-xs text-red-300">
                      {errors.agreed}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary mt-7 w-full"
                >
                  Validate application
                  <Icon name="arrowRight" size={16} />
                </button>

                <p className="mt-4 text-center text-xs text-cream/35">
                  Demo form — applications are not yet submitted or stored.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
