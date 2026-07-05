import { motion } from 'framer-motion'
import {
  Layers, Eye, Cpu, Code2, GitBranch, Sparkles, Boxes, ScanEye,
} from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const TECH = [
  'React (Vite)', 'Tailwind CSS', 'PyTorch', 'Grad-CAM', 'FastAPI (planned)',
  'Recharts', 'Framer Motion', 'Multi-modal Fusion Net',
]

const ARCHITECTURE = [
  { icon: ScanEye, title: 'CNN Image Encoder', desc: 'A convolutional backbone extracts spatial features from CT slices.' },
  { icon: Boxes, title: 'Tabular Encoder', desc: 'Clinical biomarkers are normalized and embedded via a dense network.' },
  { icon: Layers, title: 'Fusion Layer', desc: 'Image and tabular embeddings are concatenated and jointly reasoned over.' },
  { icon: Cpu, title: 'Classification Head', desc: 'A final dense layer outputs CKD / Normal with a calibrated confidence score.' },
]

const FUTURE = [
  'Support for ultrasound and MRI modalities alongside CT',
  'Federated learning across partner diagnostic centers',
  'Longitudinal tracking of patient risk over multiple visits',
  'On-device inference for low-connectivity clinics',
]

export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-b from-teal-50/70 to-white py-16 sm:py-20">
        <div className="container-page">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-700">
            <Sparkles size={14} /> About the Project
          </span>
          <h1 className="mt-5 max-w-2xl text-3xl font-bold text-ink-950 sm:text-4xl">
            An explainable, multi-modal approach to CKD detection
          </h1>
          <p className="mt-4 max-w-2xl text-ink-600">
            NephroScan AI was built to close the gap between high-performing black-box models and the
            transparency clinicians actually need to trust an automated second opinion.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader icon={Layers} title="Project Overview" />
            <p className="text-sm leading-relaxed text-ink-600">
              The system ingests a patient's CT scan alongside eight structured clinical values —
              age, gender, blood pressure, creatinine, hemoglobin, albumin, and sugar — and fuses both
              modalities into a single prediction: CKD or Normal. Every result includes a confidence
              score, a risk tier, and a Grad-CAM heatmap so the reasoning behind the prediction is
              visible, not hidden inside the model.
            </p>
          </Card>
          <Card>
            <CardHeader icon={Eye} title="Explainable AI (Grad-CAM)" />
            <p className="text-sm leading-relaxed text-ink-600">
              Gradient-weighted Class Activation Mapping (Grad-CAM) traces the model's prediction back
              to the pixels that influenced it most. The result is a heatmap overlaid on the original
              scan, giving radiologists a way to sanity-check whether the model is attending to
              clinically relevant anatomy rather than artifacts.
            </p>
          </Card>
        </div>
      </section>

      <section className="section-y bg-ink-950">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Model Architecture</h2>
          <p className="mt-2 max-w-xl text-ink-400">
            A four-stage multi-modal pipeline fuses imaging and tabular data before classification.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ARCHITECTURE.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl2 border border-ink-800 bg-ink-900 p-5"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/15 text-teal-400">
                  <a.icon size={19} />
                </div>
                <h3 className="text-sm font-semibold text-white">{a.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-400">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Code2 className="text-teal-600" size={22} />
              <h2 className="text-2xl font-bold text-ink-950">Technologies Used</h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {TECH.map((t) => (
                <Badge key={t} variant="teal">{t}</Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-5 flex items-center gap-3">
              <GitBranch className="text-teal-600" size={22} />
              <h2 className="text-2xl font-bold text-ink-950">Future Enhancements</h2>
            </div>
            <ul className="space-y-3">
              {FUTURE.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-ink-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
