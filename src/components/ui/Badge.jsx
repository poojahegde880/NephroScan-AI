const VARIANTS = {
  success: 'bg-green-50 text-green-700 border-green-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  teal: 'bg-teal-50 text-teal-700 border-teal-200',
  neutral: 'bg-ink-100 text-ink-600 border-ink-200',
}

export default function Badge({ variant = 'neutral', icon: Icon, className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${VARIANTS[variant]} ${className}`}
    >
      {Icon && <Icon size={13} />}
      {children}
    </span>
  )
}
