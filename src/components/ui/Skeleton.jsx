export function Skeleton({ className = '' }) {
  return <div className={`animate-pulseSoft rounded-lg bg-ink-100 ${className}`} />
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 border-b border-ink-100 px-5 py-4">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-4 w-12" />
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-4 w-24" />
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl2 border border-ink-100 bg-white p-6">
      <Skeleton className="mb-4 h-4 w-24" />
      <Skeleton className="mb-2 h-8 w-16" />
      <Skeleton className="h-3 w-32" />
    </div>
  )
}
