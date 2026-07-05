import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ScanLine, BrainCircuit, FlaskConical, ShieldCheck, Gauge, Layers,
  UploadCloud, Cpu, Eye, Stethoscope, CheckCircle2, ArrowRight, Activity,
} from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const FEATURES = [
  {
    icon: Layers,
    title: 'Multi-Modal Fusion',
    desc: 'Combines CT imaging with clinical biomarkers — creatinine, hemoglobin, albumin, and more — for a single, unified prediction.',
  },
  {
    icon: Eye,
    title: 'Explainable by Design',
    desc: 'Every prediction ships with a Grad-CAM heatmap showing exactly which regions of the scan informed the model.',
  },
  {
    icon: Gauge,
    title: 'Calibrated Confidence',
    desc: 'Confidence scores and risk stratification give clinicians a transparent read on prediction certainty.',
  },
  {
    icon: ShieldCheck,
    title: 'Clinical-Grade Workflow',
    desc: 'Structured intake, audit-ready history, and exportable PDF reports built for diagnostic center workflows.',
  },
]

const STEPS = [
  { icon: UploadCloud, title: 'Image Upload', desc: 'Upload a patient CT scan alongside structured clinical values.' },
  { icon: Cpu, title: 'AI Analysis', desc: 'The multi-modal model processes image and tabular data together.' },
  { icon: Eye, title: 'Grad-CAM Explanation', desc: 'A visual heatmap highlights the regions driving the prediction.' },
  { icon: Stethoscope, title: 'Clinical Analysis', desc: 'Lab values are cross-checked against established CKD thresholds.' },
  { icon: CheckCircle2, title: 'Final Prediction', desc: 'A combined CKD / Normal result with confidence and risk level.' },
]

const BENEFITS = [
  'Reduces diagnostic turnaround time in high-volume clinics',
  'Adds a transparent second opinion to radiologist workflows',
  'Standardizes reporting across diagnostic centers',
  'Surfaces early-stage risk before symptoms escalate',
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-white">
        <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-700">
              <Activity size={14} /> Explainable Multi-Modal AI
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-ink-950 sm:text-5xl lg:text-[3.25rem]">
              Explainable, multi-modal detection of{' '}
              <span className="text-gradient">chronic kidney disease</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-600 sm:text-lg">
              NephroScan AI fuses CT imaging with clinical biomarkers to deliver transparent, Grad-CAM
              explained predictions — built for diagnostic centers that need speed without sacrificing trust.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button as={Link} to="/predict" size="lg" icon={ScanLine}>
                Upload Scan
              </Button>
              <Button as={Link} to="/about" size="lg" variant="secondary" iconRight={ArrowRight}>
                How it works
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-8">
              {[['94.6%', 'Model AUC'], ['5-stage', 'XAI pipeline'], ['<30s', 'Avg. inference']].map(([v, l]) => (
                <div key={l}>
                  <p className="font-mono text-2xl font-bold text-ink-900">{v}</p>
                  <p className="text-xs text-ink-500">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="relative overflow-hidden rounded-xl2 border border-ink-800 bg-ink-950 shadow-soft">
              <div className="flex items-center gap-2 border-b border-ink-800 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-teal-400/70" />
                <span className="ml-2 text-[11px] font-medium text-ink-400">scan_0247_axial.dcm</span>
              </div>
              <div className="relative aspect-square overflow-hidden">
                <svg viewBox="0 0 300 300" className="h-full w-full">
                  <defs>
                    <radialGradient id="scanGlow" cx="50%" cy="50%" r="60%">
                      <stop offset="0%" stopColor="#2fc0b0" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#0f4441" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="300" height="300" fill="#141920" />
                  <circle cx="150" cy="150" r="110" fill="url(#scanGlow)" />
                  <ellipse cx="118" cy="150" rx="42" ry="62" fill="#1f2937" stroke="#2fc0b0" strokeWidth="1.5" opacity="0.85" />
                  <ellipse cx="182" cy="150" rx="42" ry="62" fill="#1f2937" stroke="#2fc0b0" strokeWidth="1.5" opacity="0.85" />
                  <ellipse cx="112" cy="140" rx="16" ry="22" fill="#dc2626" opacity="0.55" />
                  <circle cx="150" cy="150" r="130" fill="none" stroke="#0f504d" strokeWidth="1" strokeDasharray="4 6" />
                </svg>
                <motion.div
                  className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-teal-400/25 to-transparent"
                  animate={{ y: ['-20%', '120%'] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              <div className="flex items-center justify-between border-t border-ink-800 px-4 py-3">
                <span className="text-[11px] font-medium text-teal-400">● Grad-CAM overlay active</span>
                <span className="font-mono text-[11px] text-ink-400">CONF 91.4%</span>
              </div>
            </div>
            <div className="absolute -right-6 -top-6 hidden rounded-xl border border-ink-100 bg-white px-4 py-3 shadow-card sm:block">
              <p className="text-[11px] font-medium text-ink-400">Prediction</p>
              <p className="font-mono text-sm font-bold text-clinical-danger">CKD Detected</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-ink-950 sm:text-4xl">Built for clinical trust</h2>
            <p className="mt-3 text-ink-600">
              Every layer of the pipeline is designed to be inspected, not just trusted blindly.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card hover className="h-full">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                    <f.icon size={22} />
                  </div>
                  <h3 className="text-base font-semibold text-ink-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-y bg-ink-950">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">How it works</h2>
            <p className="mt-3 text-ink-400">A five-stage pipeline from raw scan to explainable prediction.</p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <div className="rounded-xl2 border border-ink-800 bg-ink-900 p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/15 text-teal-400">
                    <s.icon size={19} />
                  </div>
                  <p className="font-mono text-[11px] font-semibold text-teal-500">STEP {i + 1}</p>
                  <h3 className="mt-1 text-sm font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-400">{s.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <ArrowRight size={16} className="absolute -right-3 top-9 hidden text-ink-700 lg:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-y">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-ink-950 sm:text-4xl">Why diagnostic centers choose NephroScan</h2>
            <p className="mt-4 text-ink-600">
              Built alongside the realities of high patient volume, tight reporting windows, and the need
              for defensible, explainable outputs.
            </p>
            <ul className="mt-8 space-y-4">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                    <CheckCircle2 size={14} />
                  </span>
                  <span className="text-sm text-ink-700">{b}</span>
                </li>
              ))}
            </ul>
            <Button as={Link} to="/predict" className="mt-8" icon={ScanLine}>
              Start a new analysis
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[
              [BrainCircuit, '5-Model', 'Ensemble architecture'],
              [FlaskConical, '8', 'Clinical biomarkers fused'],
              [Eye, '100%', 'Predictions with Grad-CAM'],
              [ShieldCheck, 'HIPAA-ready', 'Data handling design'],
            ].map(([Icon, big, small]) => (
              <Card key={small} className="text-center">
                <Icon className="mx-auto mb-3 text-teal-600" size={26} />
                <p className="font-mono text-xl font-bold text-ink-900">{big}</p>
                <p className="mt-1 text-xs text-ink-500">{small}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
