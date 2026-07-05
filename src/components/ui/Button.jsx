import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

const VARIANTS = {
  primary:
    'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 shadow-soft focus-visible:outline-teal-700',
  secondary:
    'bg-white text-ink-800 border border-ink-200 hover:border-teal-300 hover:text-teal-700 shadow-sm',
  ghost: 'text-ink-600 hover:bg-ink-100 hover:text-ink-900',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
  outline: 'border border-teal-600 text-teal-700 hover:bg-teal-50',
}

const SIZES = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-13 px-7 text-base gap-2.5',
}

const Button = forwardRef(function Button(
  { as: Tag = 'button', variant = 'primary', size = 'md', loading = false, icon: Icon, iconRight: IconRight, className = '', children, disabled, ...props },
  ref
) {
  return (
    <Tag
      ref={ref}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        Icon && <Icon size={18} />
      )}
      {children}
      {!loading && IconRight && <IconRight size={18} />}
    </Tag>
  )
})

export default Button
