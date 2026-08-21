import { useEffect, useRef } from 'react'
import { sanitizeHtml } from '../../utils/sanitizeHtml'

// Editor visual simple (negrita, cursiva, lista con viñetas) para que alguien
// sin conocimientos técnicos pueda dar formato como en un Word, sin escribir HTML.
export default function RichTextEditor({ value, onChange, placeholder }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== (value || '')) {
      ref.current.innerHTML = value || ''
    }
  }, [value])

  const emitChange = () => {
    if (ref.current) onChange(ref.current.innerHTML)
  }

  const exec = (command) => (e) => {
    e.preventDefault() // evita que el botón robe el foco/la selección del editor
    ref.current?.focus()
    document.execCommand(command)
    emitChange()
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const html = e.clipboardData.getData('text/html')
    const text = e.clipboardData.getData('text/plain')
    const clean = html
      ? sanitizeHtml(html)
      : text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>')
    document.execCommand('insertHTML', false, clean)
    emitChange()
  }

  return (
    <div className="overflow-hidden rounded-md border border-slate-300 focus-within:border-sky-500">
      <div className="flex gap-1 border-b border-slate-200 bg-slate-50 px-2 py-1.5">
        <button
          type="button"
          onMouseDown={exec('bold')}
          className="rounded px-2.5 py-1 text-sm font-bold text-slate-700 hover:bg-slate-200"
          title="Negrita"
        >
          N
        </button>
        <button
          type="button"
          onMouseDown={exec('italic')}
          className="rounded px-2.5 py-1 text-sm italic text-slate-700 hover:bg-slate-200"
          title="Cursiva"
        >
          I
        </button>
        <button
          type="button"
          onMouseDown={exec('insertUnorderedList')}
          className="rounded px-2.5 py-1 text-sm text-slate-700 hover:bg-slate-200"
          title="Lista con viñetas"
        >
          • Lista
        </button>
      </div>
      <div
        ref={ref}
        contentEditable
        onInput={emitChange}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        className="rich-content min-h-[100px] px-3 py-2 text-sm text-slate-900 focus:outline-none"
      />
    </div>
  )
}
