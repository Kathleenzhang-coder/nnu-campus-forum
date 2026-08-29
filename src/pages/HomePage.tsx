import { Link } from 'react-router-dom'
import { MiniIllo, YouziMascot } from '../components/illos'
import { PostCard } from '../components/PostCard'
import { useAuth } from '../context/AuthContext'
import { useCampus } from '../context/CampusContext'
import { useForum } from '../context/ForumContext'

export function HomePage() {
  const { user, users } = useAuth()
  const { campus, meta } = useCampus()
  const { postsByCampus, comments } = useForum()
  const latest = [...postsByCampus(campus)]
    .filter((p) => !p.pinned)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="home">
      <header className="home-welcome">
        <YouziMascot size={64} />
        <div>
          <p className="eyebrow">南京师范大学 · {meta.name}</p>
          <h1>欢迎回来，{user?.nickname}</h1>
          <p>{meta.motto}</p>
        </div>
      </header>

      <section className="entry-grid">
        <Link className="entry-card around" to="/around">
          <MiniIllo kind="around" />
          <span className="entry-kicker">{meta.short} · 大类</span>
          <h2>校园周边生活</h2>
          <p>商场、娱乐地点、美食</p>
        </Link>
        <Link className="entry-card courses" to="/board/courses">
          <MiniIllo kind="courses" />
          <span className="entry-kicker">{meta.short} · 攻略</span>
          <h2>选课攻略</h2>
          <p>好课、壁垒、给分，由同学自己写</p>
        </Link>
        <Link className="entry-card campus" to="/board/campus">
          <MiniIllo kind="campus" />
          <span className="entry-kicker">{meta.short} · 校内</span>
          <h2>校园生活</h2>
          <p>宿舍、社团、图书馆、闲置</p>
        </Link>
      </section>

      <section className="latest">
        <div className="section-head">
          <h2>{meta.name}最新回声</h2>
        </div>
        {latest.length === 0 ? (
          <p className="empty">这个校区还没有同学发言。去版块里写第一帖吧。</p>
        ) : (
          <div className="post-list">
            {latest.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                users={users}
                commentCount={comments.filter((c) => c.postId === post.id).length}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
