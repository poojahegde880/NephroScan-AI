import { Link } from 'react-router-dom'
import { ScanSearch } from 'lucide-react'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600">
        <ScanSearch size={30} />
      </div>
      <h1 className="text-3xl font-bold text-ink-950">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-ink-500">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Button as={Link} to="/" className="mt-6">
        Back to Home
      </Button>
    </div>
  )
}
