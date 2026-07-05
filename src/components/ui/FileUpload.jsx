import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { UploadCloud, X, FileImage } from 'lucide-react'

export default function FileUpload({ file, onFileSelect, onClear, accept = 'image/*', maxSizeMb = 15 }) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)
  const previewUrl = file ? URL.createObjectURL(file) : null

  const validateAndSet = useCallback(
    (candidate) => {
      if (!candidate) return
      if (!candidate.type.startsWith('image/')) {
        setError('Please upload an image file (PNG, JPG, or DICOM export).')
        return
      }
      if (candidate.size > maxSizeMb * 1024 * 1024) {
        setError(`File is larger than ${maxSizeMb}MB.`)
        return
      }
      setError('')
      onFileSelect(candidate)
    },
    [maxSizeMb, onFileSelect]
  )

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files?.[0]
    validateAndSet(dropped)
  }

  if (file) {
    return (
      <div className="relative overflow-hidden rounded-xl2 border border-ink-200 bg-ink-950">
        <img src={previewUrl} alt="Uploaded CT scan preview" className="mx-auto max-h-80 w-full object-contain" />
        <div className="flex items-center justify-between gap-3 border-t border-ink-800 bg-ink-900 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2 text-ink-100">
            <FileImage size={16} className="shrink-0 text-teal-400" />
            <span className="truncate text-xs font-medium">{file.name}</span>
            <span className="shrink-0 text-xs text-ink-400">{(file.size / 1024 / 1024).toFixed(1)}MB</span>
          </div>
          <button
            onClick={onClear}
            className="flex shrink-0 items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-white/20"
          >
            <X size={14} /> Remove
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <motion.div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        aria-label="Upload CT scan image"
        animate={{ scale: isDragging ? 1.01 : 1 }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl2 border-2 border-dashed px-6 py-14 text-center transition-colors ${
          isDragging ? 'border-teal-500 bg-teal-50' : 'border-ink-200 bg-ink-50/60 hover:border-teal-300 hover:bg-teal-50/40'
        }`}
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-600">
          <UploadCloud size={26} />
        </div>
        <p className="text-sm font-semibold text-ink-800">Drag & drop a CT scan here</p>
        <p className="mt-1 text-xs text-ink-500">or click to browse · PNG, JPG up to {maxSizeMb}MB</p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => validateAndSet(e.target.files?.[0])}
        />
      </motion.div>
      {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
}
