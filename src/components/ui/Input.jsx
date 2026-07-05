import { forwardRef, useId } from 'react'

export const Input = forwardRef(function Input(
  { label, error, hint, unit, className = '', wrapperClassName = '', ...props },
  ref
) {
  const autoId = useId()
  const id = props.id || autoId
  return (
    <div className={wrapperClassName}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={`h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-teal-500 focus:ring-4 focus:ring-teal-100 ${
            error ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-ink-200'
          } ${unit ? 'pr-12' : ''} ${className}`}
          {...props}
        />
        {unit && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-ink-400">
            {unit}
          </span>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-400">
          {hint}
        </p>
      )}
    </div>
  )
})

export const Select = forwardRef(function Select(
  { label, error, options = [], className = '', wrapperClassName = '', ...props },
  ref
) {
  const autoId = useId()
  const id = props.id || autoId
  return (
    <div className={wrapperClassName}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-700">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        aria-invalid={!!error}
        className={`h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-ink-900 transition-colors focus:border-teal-500 focus:ring-4 focus:ring-teal-100 ${
          error ? 'border-red-300' : 'border-ink-200'
        } ${className}`}
        {...props}
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
})

export default Input
