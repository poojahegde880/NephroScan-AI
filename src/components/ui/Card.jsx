export default function Card({ as: Tag = 'div', className = '', padded = true, hover = false, children, ...props }) {
  return (
    <Tag
      className={`rounded-xl2 border border-ink-100 bg-white shadow-card ${padded ? 'p-6' : ''} ${
        hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-soft hover:border-teal-200' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function CardHeader({ title, subtitle, icon: Icon, action, className = '' }) {
  return (
    <div className={`mb-5 flex items-start justify-between gap-4 ${className}`}>
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
            <Icon size={20} />
          </div>
        )}
        <div>
          <h3 className="text-base font-semibold text-ink-900">{title}</h3>
          {subtitle && <p className="mt-0.5 text-sm text-ink-500">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}
