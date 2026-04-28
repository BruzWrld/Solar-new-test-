import { useMemo, useState } from 'react'

const serviceCategories = [
  {
    title: 'Solar & Energy',
    description: 'Lower bills, battery storage, and home energy guidance.',
  },
  {
    title: 'Roofing',
    description: 'Repair, replacement, and storm-related roof needs.',
  },
  {
    title: 'Water Filtration',
    description: 'Cleaner water options for the home.',
  },
  {
    title: 'Smart Home',
    description: 'Security, automation, and connected home upgrades.',
  },
  {
    title: 'Yard & Outdoor',
    description: 'Landscaping, tree care, and outdoor improvements.',
  },
  {
    title: 'Events & Local Services',
    description: 'Local event, vendor, and service support.',
  },
  {
    title: 'Other',
    description: 'Tell us what you need and we’ll review it.',
  },
]

const urgencyOptions = ['Today', 'This Week', 'This Month', 'Just Researching']

const initialFormData = {
  fullName: '',
  phone: '',
  email: '',
  addressOrZip: '',
  serviceNeeded: '',
  urgency: '',
  shortDescription: '',
}

export default function App() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const requiredFields = useMemo(
    () => ['fullName', 'phone', 'email', 'addressOrZip', 'serviceNeeded', 'urgency', 'shortDescription'],
    [],
  )

  const validate = () => {
    const nextErrors = {}

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        nextErrors[field] = 'This field is required.'
      }
    })

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    if (submitted) {
      setSubmitted(false)
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSubmitted(false)
      return
    }

    if (import.meta.env.DEV) {
      console.info('Request submitted')
    }
    setSubmitted(true)
    setFormData(initialFormData)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute bottom-10 right-4 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-glow backdrop-blur sm:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-sky-300">Community Outreach v1</p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-5xl">
            Find Trusted Local Help Without Guessing Who to Call
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
            Tell us what you need, and we’ll help connect you with a reliable local option.
          </p>
          <a
            href="#intake-form"
            className="mt-6 inline-flex rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
          >
            Start My Request
          </a>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-panel/80 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold sm:text-3xl">A simpler way to find trusted local help</h2>
          <p className="mt-4 text-slate-300">
            Tell us what you need once. We review your request and help point you toward a local option that fits the
            job.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold sm:text-3xl">Service categories</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((category) => (
              <article
                key={category.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
              >
                <h3 className="text-lg font-medium text-slate-100">{category.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{category.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="intake-form" className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold sm:text-3xl">Customer intake form</h2>
          <p className="mt-2 text-slate-400">Tell us a little about your request and we’ll follow up shortly.</p>

          <form className="mt-6 grid grid-cols-1 gap-4" onSubmit={handleSubmit} noValidate>
            <Field
              label="Full name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />
            <Field
              label="Phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Field
              label="Address or ZIP code"
              name="addressOrZip"
              value={formData.addressOrZip}
              onChange={handleChange}
              error={errors.addressOrZip}
            />

            <label className="block">
              <span className="text-sm text-slate-200">Service needed</span>
              <select
                name="serviceNeeded"
                value={formData.serviceNeeded}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-sky-400 focus:ring-2"
              >
                <option value="">Select a category</option>
                {serviceCategories.map((category) => (
                  <option key={category.title} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
              {errors.serviceNeeded ? <p className="mt-1 text-sm text-rose-300">{errors.serviceNeeded}</p> : null}
            </label>

            <label className="block">
              <span className="text-sm text-slate-200">Urgency</span>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-sky-400 focus:ring-2"
              >
                <option value="">Select urgency</option>
                {urgencyOptions.map((urgency) => (
                  <option key={urgency} value={urgency}>
                    {urgency}
                  </option>
                ))}
              </select>
              {errors.urgency ? <p className="mt-1 text-sm text-rose-300">{errors.urgency}</p> : null}
            </label>

            <label className="block">
              <span className="text-sm text-slate-200">Short description</span>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                rows={4}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-sky-400 focus:ring-2"
                placeholder="Share any key details about what you need."
              />
              {errors.shortDescription ? <p className="mt-1 text-sm text-rose-300">{errors.shortDescription}</p> : null}
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex w-full justify-center rounded-full bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 sm:w-auto"
            >
              Submit Request
            </button>
            <p className="text-sm text-slate-400">Demo form only — official request form coming next.</p>

            {submitted ? (
              <p className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 text-emerald-200">
                Your request has been received. We’ll review it and follow up shortly.
              </p>
            ) : null}
          </form>
        </section>

      </main>
    </div>
  )
}

function Field({ label, name, value, onChange, error, type = 'text' }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-200">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-sky-400 focus:ring-2"
      />
      {error ? <p className="mt-1 text-sm text-rose-300">{error}</p> : null}
    </label>
  )
}
