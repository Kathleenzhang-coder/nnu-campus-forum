import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BOARDS } from '../data/boards'
import { timeAgo } from '../lib/format'
import {
  clearAdminKey,
  deleteRemotePost,
  fetchAdminPosts,
  getAdminKey,
  loginAdmin,
} from '../lib/forumApi'
import type { Post } from '../types'

export function AdminPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(() => Boolean(getAdminKey()))
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!authed) return
    void load()
  }, [authed])

  async function load() {
    const list = await fetchAdminPosts()
    if (!list) {
      setAuthed(false)
      clearAdminKey()
      setError('登录已失效，请重新输入后台密码。')
      return
    }
    setPosts(list)
  }

  async function onLogin(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const ok = await loginAdmin(password)
    setBusy(false)
    if (!ok) {
      setError('密码不对，或后台还没接通。')
      return
    }
    setAuthed(true)
    await load()
  }

  async function onDelete(post: Post) {
    const label = post.title.trim() || post.content.trim().slice(0, 20) || '这条帖子'
    if (!window.confirm(`确定删除「${label}」？删除后用户端将看不到。`)) return
    const ok = await deleteRemotePost(post.id)
    if (!ok) {
      setError('删除失败。')
      return
    }
    setPosts((list) => list.filter((p) => p.id !== post.id))
  }

  if (!authed) {
    return (
      <div className="admin-screen">
        <form className="setup-card" onSubmit={onLogin}>
          <p className="eyebrow">审核后台</p>
          <h1>南师柚园</h1>
          <p className="hint">只有站务可以进入。用户发帖后会立刻出现在这里，发现不当内容可以直接删除。</p>
          <label>
            后台密码
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入审核密码"
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="primary-btn" type="submit" disabled={busy || !password.trim()}>
            {busy ? '验证中…' : '进入后台'}
          </button>
          <button className="ghost-btn" type="button" onClick={() => navigate('/')}>
            返回柚园
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="admin-shell">
      <header className="topbar">
        <span className="brand">
          <span className="brand-seal">审</span>
          <span>
            <strong>柚园审核后台</strong>
            <em>共 {posts.length} 条帖子</em>
          </span>
        </span>
        <button className="ghost-btn" type="button" onClick={() => void load()}>
          刷新
        </button>
        <button
          className="ghost-btn"
          type="button"
          onClick={() => {
            clearAdminKey()
            setAuthed(false)
            setPosts([])
          }}
        >
          退出后台
        </button>
      </header>
      <main className="main">
        {error && <p className="form-error">{error}</p>}
        {posts.length === 0 ? (
          <p className="empty">还没有用户发帖。</p>
        ) : (
          <div className="admin-list">
            {posts.map((post) => (
              <article key={post.id} className="admin-card">
                <div className="post-card-top">
                  <span className="badge campus">{post.campus}</span>
                  <span className="badge muted">{BOARDS[post.boardId]?.name}</span>
                  {post.pinned && <span className="badge pin">置顶</span>}
                  <span className="grow" />
                  <span>{timeAgo(post.createdAt)}</span>
                </div>
                <h2>{post.title.trim() || '（无标题）'}</h2>
                <p className="admin-author">
                  {post.author?.nickname ?? '同学'}
                  {post.authorRealName ? ` · 认证姓名 ${post.authorRealName}` : ''}
                  {post.author ? ` · ${post.author.major} ${post.author.enrollYear} 级` : ''}
                </p>
                {post.content && <p className="excerpt">{post.content}</p>}
                {(post.media ?? []).length > 0 && (
                  <div className="media-row">
                    {(post.media ?? [])
                      .filter((m) => m.kind === 'image')
                      .map((item) => (
                        <img key={item.id} src={item.src} alt="" />
                      ))}
                    {(post.media ?? []).some((m) => m.kind === 'video') && <span className="badge">含视频</span>}
                  </div>
                )}
                <div className="compose-actions">
                  <Link className="ghost-btn" to={`/post/${post.id}`}>
                    查看
                  </Link>
                  <button className="danger-btn" type="button" onClick={() => void onDelete(post)}>
                    删除
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
