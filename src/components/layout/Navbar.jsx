import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Menu, X, ScanLine } from 'lucide-react'
import Button from '../ui/Button'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/predict', label: 'New Scan' },
  { to: '/dashboard', label: 'Patient History' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white">
            <Activity size={18} />
          </span>
          <span className="font-display text-[15px] font-bold leading-tight text-ink-950">
            NephroScan <span className="text-teal-600">AI</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-teal-50 text-teal-700' : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button as={NavLink} to="/predict" size="sm" icon={ScanLine}>
            Upload Scan
          </Button>
        </div>

        <button
          className="rounded-lg p-2 text-ink-700 hover:bg-ink-100 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-ink-100 bg-white lg:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-3">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3.5 py-2.5 text-sm font-medium ${
                      isActive ? 'bg-teal-50 text-teal-700' : 'text-ink-600 hover:bg-ink-50'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Button as={NavLink} to="/predict" size="sm" className="mt-2 w-full" onClick={() => setOpen(false)}>
                Upload Scan
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
