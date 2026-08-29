import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { useAuth } from '../context/AuthContext'
import { useForum } from '../context/ForumContext'
import { BOARDS, CAMPUS_TAGS, COURSE_TAGS } from '../data/boards'
import { postHeading, timeAgo, yearLabel } from '../lib/format'
import { isDirectVideo } from '../lib/media'
import { resolveAuthor } from '../lib/storage'

export function PostPage() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const { user, users } = useAuth()
  const { getPost, commentsOf, addComment, toggleLike } = useForum()
  const [text, setText] = useState('')
  const post = postId ? getPost(postId) : undefined

  if (!post) {
    return (
      <div className="empty-card">
        <p>帖子不存在或已被删除。</p>
        <Link to="/">回到首页</Link>
      </div>
    )
  }

  const author = post.author ?? resolveAuthor(post.authorId, users)
  const comments = commentsOf(post.id)
  const meta = BOARDS[post.boardId]
  const liked = user ? post.likes.includes(user.id) : false
  const courseTag = COURSE_TAGS.find((t) => t.id === post.courseTag)
  const campusTag = CAMPUS_TAGS.find((t) => t.id === post.campusTag)

  function onComment(e: FormEvent) {
    e.preventDefault()
    if (!user || !text.trim() || !post) return
    addComment(post.id, user.id, text)
    setText('')
  }

  return (
    <article className="thread">
      <nav className="crumbs">
        <Link to="/">柚园</Link>
        <span>/</span>
        <span>{post.campus}校区</span>
        {meta.parentPath && (
          <>
            <span>/</span>
            <Link to={meta.parentPath}>{meta.parent}</Link>
          </>
        )}
        <span>/</span>
        <Link to={`/board/${post.boardId}`}>
          {meta.emoji} {meta.name}
        </Link>
      </nav>

      <header className="thread-head">
        <div className="post-card-top">
          {post.pinned && <span className="badge pin">置顶</span>}
          {courseTag && <span className={`badge tag-${post.courseTag}`}>{courseTag.label}</span>}
          {campusTag && <span className="badge muted">{campusTag.label}</span>}
          {post.campus && <span className="badge campus">{post.campus}</span>}
        </div>
        <h1>{postHeading(post)}</h1>
        {post.courseName && (
          <p className="course-line big">
            {post.courseName}
            {post.teacher ? ` · ${post.teacher}` : ''}
          </p>
        )}
        <div className="post-meta">
          <Avatar avatar={author.avatar} size={36} alt={author.nickname} />
          <span>
            <b>{author.nickname}</b>
            <small>
              {author.major} · {yearLabel(author.enrollYear)}
            </small>
          </span>
          <span className="grow" />
          <span>{timeAgo(post.createdAt)}</span>
        </div>
      </header>

      {(post.content || (post.media && post.media.length > 0)) && (
        <div className="thread-body">
          {post.content ? <div className="thread-text">{post.content}</div> : null}
          {post.media && post.media.length > 0 && (
            <div className="thread-media">
              {post.media.map((item) =>
                item.kind === 'image' ? (
                  <img key={item.id} src={item.src} alt="" />
                ) : isDirectVideo(item.src) ? (
                  <video key={item.id} src={item.src} controls playsInline />
                ) : (
                  <a key={item.id} className="video-link" href={item.src} target="_blank" rel="noreferrer">
                    打开视频链接
                  </a>
                ),
              )}
            </div>
          )}
        </div>
      )}

      <div className="thread-actions">
        <button
          className={liked ? 'like-btn on' : 'like-btn'}
          onClick={() => user && toggleLike(post.id, user.id)}
        >
          {liked ? '已点赞' : '点赞'} · {post.likes.length}
        </button>
        <button className="ghost-btn" onClick={() => navigate(`/board/${post.boardId}`)}>
          返回版块
        </button>
      </div>

      <section className="comments">
        <h2>讨论 {comments.length ? `(${comments.length})` : ''}</h2>
        {comments.length === 0 && <p className="empty">还没有回复，来写第一条吧。</p>}
        <ul>
          {comments.map((c) => {
            const who = resolveAuthor(c.authorId, users)
            return (
              <li key={c.id} className="comment">
                <Avatar avatar={who.avatar} size={32} alt={who.nickname} />
                <div>
                  <div className="comment-meta">
                    <b>{who.nickname}</b>
                    <span>{timeAgo(c.createdAt)}</span>
                  </div>
                  <p>{c.content}</p>
                </div>
              </li>
            )
          })}
        </ul>
        <form className="comment-form" onSubmit={onComment}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="以昵称发言，友善一些。"
            rows={3}
          />
          <button className="primary-btn" type="submit" disabled={!text.trim()}>
            发布回复
          </button>
        </form>
      </section>
    </article>
  )
}


