import { useEffect, useState } from 'react'
import { useContent } from '../context/ContentContext'
import { assetUrl } from '../api/client'
import { LinkedInIcon, UserIcon, ChevronLeftIcon, ChevronRightIcon } from './icons'
import Reveal from './Reveal'

const ABOUT_LIMIT = 200

function parseTeam(raw) {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function truncate(text, max) {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + '…'
}

export default function Equipo() {
  const { content } = useContent()
  const team = parseTeam(content.team_json)
  const [index, setIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setExpanded(false)
  }, [index])

  if (team.length === 0) return null

  const member = team[index]
  const photo = assetUrl(member.photo)
  const aboutIsLong = (member.about || '').length > ABOUT_LIMIT
  const prev = () => setIndex((i) => (i === 0 ? team.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === team.length - 1 ? 0 : i + 1))

  return (
    <section id="equipo" className="bg-slate-50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
            Nuestro equipo
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Profesionales a cargo
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <Reveal key={index}>
            <div className="flex flex-col items-center gap-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:flex-row sm:gap-12 sm:p-12">
              <div className="h-36 w-36 flex-none overflow-hidden rounded-full bg-slate-100 ring-4 ring-amber-100 sm:h-44 sm:w-44">
                {photo ? (
                  <img src={photo} alt={member.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-300">
                    <UserIcon className="h-16 w-16" />
                  </div>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-display text-2xl font-bold text-slate-900">{member.name}</h3>
                {member.profession && (
                  <p className="mt-1 text-base font-medium text-amber-600">{member.profession}</p>
                )}
                {member.about && (
                  <div className="mt-4 leading-relaxed text-slate-600">
                    <p>{expanded || !aboutIsLong ? member.about : truncate(member.about, ABOUT_LIMIT)}</p>
                    {aboutIsLong && (
                      <button
                        type="button"
                        onClick={() => setExpanded((v) => !v)}
                        className="mt-1 text-sm font-semibold text-amber-600 hover:text-amber-700"
                      >
                        {expanded ? 'Leer menos' : 'Leer más'}
                      </button>
                    )}
                  </div>
                )}

                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2.5 rounded-md bg-[#0A66C2] px-5 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-[#004182]"
                  >
                    <LinkedInIcon className="h-5 w-5" />
                    Ver perfil de LinkedIn
                  </a>
                )}
              </div>
            </div>
          </Reveal>

          {team.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-6">
              <button
                type="button"
                aria-label="Profesional anterior"
                onClick={prev}
                className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:border-amber-400 hover:text-amber-600"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>

              <div className="flex gap-2">
                {team.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Ver profesional ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? 'w-6 bg-amber-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Siguiente profesional"
                onClick={next}
                className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:border-amber-400 hover:text-amber-600"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
