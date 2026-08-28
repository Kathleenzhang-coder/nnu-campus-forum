import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PostCard } from '../components/PostCard'
import { useAuth } from '../context/AuthContext'
import { useCampus } from '../context/CampusContext'
import { useForum } from '../context/ForumContext'
import { BOARDS, CAMPUS_TAGS, COURSE_TAGS } from '../data/boards'
import type { BoardId, CampusTag, CourseTag } from '../types'

const VALID: BoardId[] = ['mall', 'fun', 'food', 'courses', 'campus']

export function BoardPage() {
  const { boardId } = useParams()
  const { users } = useAuth()
  const { campus, meta: campusInfo } = useCampus()
  const { postsByBoard, comments } = useForum()
  const [q, setQ] = useState('')
  const [courseTag, setCourseTag] = useState<CourseTag | 'all'>('all')
  const [campusTag, setCampusTag] = useState<CampusTag | 'all'>('all')
  const id = boardId && VALID.includes(boardId as BoardId) ? (boardId as BoardId) : null
  const posts = id ? postsByBoard(id, campus) : []

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (courseTag !== 'all' && p.courseTag !== courseTag) return false
      if (campusTag !== 'all' && p.campusTag !== campusTag) return false
      if (!q.trim()) return true
      const blob = `${p.title} ${p.content} ${p.courseName ?? ''} ${p.teacher ?? ''}`.toLowerCase()
      return blob.includes(q.trim().toLowerCase())
    })
  }, [posts, q, courseTag, campusTag])

  if (!id) return <Navigate to="/" replace />
  const meta = BOARDS[id]
  const boardLead =
    id === 'mall' || id === 'fun' || id === 'food'
      ? campusInfo.around[id].desc
      : meta.blurb

  return (
    <div className="board">
      <nav className="crumbs">
        <Link to="/">柚园</Link>
        <span>/</span>
        <span>{campusInfo.name}</span>
        {meta.parentPath && (
          <>
            <span>/</span>
            <Link to={meta.parentPath}>{meta.parent}</Link>
          </>
        )}
        <span>/</span>
        <span>
          {meta.emoji} {meta.name}
        </span>
      </nav>

      <header className="page-head split">
        <div>
          <p className="eyebrow">
            {campusInfo.name} · {meta.parent ?? '柚园版块'}
          </p>
          <h1>
            {meta.emoji} {meta.name}
          </h1>
          <p>
            {campusInfo.short}校区专属。{boardLead}
          </p>
        </div>
        <Link className="primary-btn" to={`/board/${id}/new`}>
          发帖
        </Link>
      </header>

      <div className="filters">
        <input
          className="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={id === 'courses' ? '搜索课程、老师或关键词' : '搜索标题或正文'}
        />
        {id === 'courses' && (
          <div className="chips">
            <button className={courseTag === 'all' ? 'chip on' : 'chip'} onClick={() => setCourseTag('all')}>
              全部
            </button>
            {COURSE_TAGS.map((tag) => (
              <button
                key={tag.id}
                className={courseTag === tag.id ? 'chip on' : 'chip'}
                onClick={() => setCourseTag(tag.id)}
              >
                {tag.label}
              </button>
            ))}
          </div>
        )}
        {id === 'campus' && (
          <div className="chips">
            <button className={campusTag === 'all' ? 'chip on' : 'chip'} onClick={() => setCampusTag('all')}>
              全部
            </button>
            {CAMPUS_TAGS.map((tag) => (
              <button
                key={tag.id}
                className={campusTag === tag.id ? 'chip on' : 'chip'}
                onClick={() => setCampusTag(tag.id)}
              >
                {tag.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-card">
          <p>这个校区还没有符合条件的帖子。</p>
          <p>选课评价、探店和校内见闻都由{campusInfo.short}同学来写，欢迎成为第一位发言的人。</p>
          <Link className="primary-btn" to={`/board/${id}/new`}>
            写一篇
          </Link>
        </div>
      ) : (
        <div className="post-list">
          {filtered.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              users={users}
              commentCount={comments.filter((c) => c.postId === post.id).length}
            />
          ))}
        </div>
      )}
    </div>
  )
}
