import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useToast } from '../context/ToastContext'
// import { submitContactForm } from '../api/endpoints'

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'support@nephroscan.ai' },
  { icon: Phone, label: 'Phone', value: '+91 98 7654 3210' },
  { icon: MapPin, label: 'Location', value: 'Diagnostic Innovation Lab, Bengaluru' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', organization: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const { notify } = useToast()

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (!form.message.trim()) next.message = 'Please add a short message.'
    setErrors(next)
    if (Object.keys(next).length) return

    setSubmitting(true)
    // await submitContactForm(form)
    await new Promise((r) => setTimeout(r, 900))
    setSubmitting(false)
    notify('Message sent — our team will respond within 1 business day.', 'success')
    setForm({ name: '', email: '', organization: '', message: '' })
  }

  return (
    <div className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-ink-950 sm:text-4xl">Get in touch</h1>
        <p className="mt-3 text-ink-600">
          Questions about deploying NephroScan AI at your diagnostic center? We'd love to hear from you.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {CONTACT_INFO.map((c) => (
            <Card key={c.label} className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                <c.icon size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-ink-400">{c.label}</p>
                <p className="text-sm font-semibold text-ink-800">{c.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="lg:col-span-3">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full Name" placeholder="Dr. Jane Doe" value={form.name} onChange={update('name')} error={errors.name} />
              <Input label="Email" type="email" placeholder="jane@hospital.com" value={form.email} onChange={update('email')} error={errors.email} />
            </div>
            <Input label="Organization (optional)" placeholder="City Diagnostic Center" value={form.organization} onChange={update('organization')} />
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-700">Message</label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={update('message')}
                placeholder="Tell us about your use case…"
                aria-invalid={!!errors.message}
                className={`w-full rounded-xl border bg-white px-3.5 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-teal-500 focus:ring-4 focus:ring-teal-100 ${
                  errors.message ? 'border-red-300' : 'border-ink-200'
                }`}
              />
              {errors.message && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.message}</p>}
            </div>
            <Button type="submit" size="lg" icon={Send} loading={submitting} className="w-full sm:w-auto">
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
