import { Link } from 'react-router-dom'
import { Activity, Github, Linkedin, Mail, ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white">
              <Activity size={18} />
            </span>
            <span className="font-display text-[15px] font-bold text-ink-950">
              NephroScan <span className="text-teal-600">AI</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
            Explainable multi-modal AI for chronic kidney disease detection — combining CT imaging with
            clinical biomarkers for transparent, clinician-ready predictions.
          </p>
          <div className="mt-5 flex items-center gap-2 text-xs font-medium text-ink-400">
            <ShieldCheck size={14} className="text-teal-600" />
            Research & decision-support use only — not a diagnostic device.
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink-900">Platform</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-500">
            <li><Link to="/predict" className="hover:text-teal-700">New Scan</Link></li>
            <li><Link to="/dashboard" className="hover:text-teal-700">Patient History</Link></li>
            <li><Link to="/about" className="hover:text-teal-700">Model Architecture</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink-900">Company</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-500">
            <li><Link to="/about" className="hover:text-teal-700">About the Project</Link></li>
            <li><Link to="/contact" className="hover:text-teal-700">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink-900">Connect</h4>
          <div className="mt-4 flex gap-2.5">
            {[Github, Linkedin, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-500 transition-colors hover:border-teal-300 hover:text-teal-700"
                aria-label="Social link"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-ink-100 py-5">
        <p className="container-page text-center text-xs text-ink-400">
          © {new Date().getFullYear()} NephroScan AI. Built for research and clinical decision support.
        </p>
      </div>
    </footer>
  )
}
