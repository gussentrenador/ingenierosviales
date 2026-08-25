import { useRef } from 'react'
import { assetUrl } from '../../api/client'

export default function ImageField({ section, label, value, uploading, error, onChange }) {
  const inputRef = useRef(null)
  const preview = assetUrl(value)

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        <div className="relative aspect-video w-full flex-none overflow-hidden rounded-md bg-slate-100 sm:w-48">
          {preview ? (
            <img src={preview} alt={label} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-slate-400">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 16l5-5 4 4 3-3 6 6" />
                <circle cx="8.5" cy="9.5" r="1.5" />
              </svg>
              <span className="text-xs">Sin imagen</span>
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          {section && (
            <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
              {section}
            </span>
          )}
          <p className="mt-1.5 text-sm font-medium text-slate-700">{label}</p>

          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading ? 'Subiendo…' : preview ? 'Reemplazar imagen' : 'Subir imagen'}
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0]
                onChange(file)
                e.target.value = ''
              }}
            />
          </div>

          {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}
          <p className="mt-2 text-xs text-slate-400">JPG, PNG, WEBP o GIF · máx. 100MB</p>
        </div>
      </div>
    </div>
  )
}
