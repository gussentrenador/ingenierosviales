import { useContent } from '../context/ContentContext'
import { assetUrl } from '../api/client'
import { LinkedInIcon, UserIcon } from './icons'
import Reveal from './Reveal'

function parseTeam(raw) {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function Equipo() {
  const { content } = useContent()
  const team = parseTeam(content.team_json)

  if (team.length === 0) return null

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

        <div className="mt-14 flex flex-wrap justify-center gap-8">
          {team.map((member, i) => {
            const photo = assetUrl(member.photo)
            return (
              <Reveal
                key={i}
                delay={i * 120}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
              >
                <div className="flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-lg">
                  <div className="h-24 w-24 flex-none overflow-hidden rounded-full bg-slate-100 ring-4 ring-amber-100">
                    {photo ? (
                      <img src={photo} alt={member.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-300">
                        <UserIcon className="h-10 w-10" />
                      </div>
                    )}
                  </div>

                  <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">
                    {member.name}
                  </h3>
                  {member.profession && (
                    <p className="text-sm font-medium text-amber-600">{member.profession}</p>
                  )}
                  {member.about && (
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.about}</p>
                  )}

                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-[#0A66C2] hover:text-[#0A66C2]"
                    >
                      <LinkedInIcon className="h-4 w-4" />
                      Ver perfil de LinkedIn
                    </a>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
