import { Link } from 'react-router-dom'
import { CampusHero } from '../components/CampusHero'
import { useCampus } from '../context/CampusContext'

export function AroundHubPage() {
  const { meta } = useCampus()
  const subs = [
    {
      to: '/board/mall',
      emoji: '🛍️',
      name: '商场',
      desc: meta.around.mall.desc,
    },
    {
      to: '/board/fun',
      emoji: '🎡',
      name: '娱乐地点',
      desc: meta.around.fun.desc,
    },
    {
      to: '/board/food',
      emoji: '🍜',
      name: '美食',
      desc: meta.around.food.desc,
    },
  ]

  return (
    <div className="around">
      <nav className="crumbs">
        <Link to="/">柚园</Link>
        <span>/</span>
        <span>{meta.name}</span>
        <span>/</span>
        <span>校园周边生活</span>
      </nav>
      <CampusHero
        kicker={`${meta.name} · 校园周边生活`}
        title={<h1>先选一个小类</h1>}
      >
        <p className="hero-copy">{meta.aroundLead}</p>
      </CampusHero>
      <div className="sub-grid">
        {subs.map((item) => (
          <Link key={item.to} className="sub-card" to={item.to}>
            <span className="sub-emoji">{item.emoji}</span>
            <h2>{item.name}</h2>
            <p>{item.desc}</p>
            <span className="entry-go">进入{item.name} →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
