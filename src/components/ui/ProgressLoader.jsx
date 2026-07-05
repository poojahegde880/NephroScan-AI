import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

// steps: [{ label }], activeIndex: number (0-based, in-progress step)
export default function ProgressLoader({ steps, activeIndex }) {
  return (
    <div className="w-full">
      <div className="flex items-center">
        {steps.map((step, i) => {
          const done = i < activeIndex
          const active = i === activeIndex
          return (
            <div key={step.label} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`relative flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${
                    done
                      ? 'border-teal-600 bg-teal-600 text-white'
                      : active
                      ? 'border-teal-500 bg-white text-teal-600'
                      : 'border-ink-200 bg-white text-ink-400'
                  }`}
                >
                  {done ? <Check size={16} /> : i + 1}
                  {active && (
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-teal-400"
                      animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                </div>
                <span
                  className={`w-20 text-center text-[11px] font-medium leading-tight ${
                    active ? 'text-teal-700' : done ? 'text-ink-700' : 'text-ink-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="mx-1.5 h-0.5 flex-1 rounded bg-ink-100 sm:mx-2">
                  <motion.div
                    className="h-0.5 rounded bg-teal-500"
                    initial={{ width: '0%' }}
                    animate={{ width: done ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
