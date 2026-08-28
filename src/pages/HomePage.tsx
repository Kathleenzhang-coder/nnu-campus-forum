import { Link } from 'react-router-dom'
import { CampusHero } from '../components/CampusHero'
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
      <CampusHero
        title={
          <h1>
            欢迎回来，{user?.nickname}
            <span>{meta.motto}</span>
          </h1>
        }
      >
        <p className="hero-copy">{meta.hero}</p>
      </CampusHero>

      <section className="entry-grid">
        <Link className="entry-card around" to="/around">
          <span className="entry-kicker">{meta.short} · 大类</span>
          <h2>校园周边生活</h2>
          <p>走出{meta.short}校门：商场、娱乐地点、美食。先进入本类，再点开小类。</p>
          <span className="entry-go">进入三个小类 →</span>
        </Link>
        <Link className="entry-card courses" to="/board/courses">
          <span className="entry-kicker">{meta.short} · 攻略</span>
          <h2>选课攻略</h2>
          <p>本区哪种课好选、哪种课有壁垒，全部由{meta.short}同学填写，柚园不代写评价。</p>
          <span className="entry-go">去看 / 去写 →</span>
        </Link>
        <Link className="entry-card campus" to="/board/campus">
          <span className="entry-kicker">{meta.short} · 校内</span>
          <h2>校园生活</h2>
          <p>{meta.short}内部生活：宿舍日常、社团、图书馆、闲置与失物招领。</p>
          <span className="entry-go">走进校园 →</span>
        </Link>
      </section>

      <section className="latest">
        <div className="section-head">
          <h2>{meta.name}最新回声</h2>
          <p>不含置顶说明。左上角切换校区后，三个板块会换成对应校区的内容。</p>
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
