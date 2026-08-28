import type { ReactNode } from 'react'
import { useCampus } from '../context/CampusContext'

type Props = {
  kicker?: string
  title: ReactNode
  children?: ReactNode
}

export function CampusHero({ kicker, title, children }: Props) {
  const { meta } = useCampus()

  return (
    <section className="campus-hero">
      <div className="campus-hero-photo" role="img" aria-label={meta.name} />
      <div className="campus-hero-copy">
        <p className="eyebrow">{kicker ?? `南京师范大学 · ${meta.name}`}</p>
        {title}
        <p className="hero-style">{meta.style}</p>
        {children}
      </div>
    </section>
  )
}
