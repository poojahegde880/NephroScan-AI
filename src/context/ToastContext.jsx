import { createContext, useCallback, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const STYLES = {
  success: 'border-teal-200 bg-teal-50 text-teal-800',
  error: 'border-red-200 bg-red-50 text-red-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const notify = useCallback((message, type = 'info', duration = 4000) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, type }])
    if (duration) setTimeout(() => dismiss(id), duration)
    return id
  }, [dismiss])

  return (
    <ToastContext.Provider value={{ notify, dismiss }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-2.5">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = ICONS[t.type] || Info
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                role="status"
                className={`flex items-start gap-3 rounded-xl2 border px-4 py-3 shadow-card ${STYLES[t.type]}`}
              >
                <Icon size={18} className="mt-0.5 shrink-0" />
                <p className="flex-1 text-sm font-medium leading-snug">{t.message}</p>
                <button
                  onClick={() => dismiss(t.id)}
                  aria-label="Dismiss notification"
                  className="shrink-0 rounded-md p-0.5 text-current/60 hover:bg-black/5"
                >
                  <X size={15} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
