import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCampus } from '../context/CampusContext'
import { useForum } from '../context/ForumContext'
import { BOARDS, CAMPUS_TAGS, COURSE_TAGS } from '../data/boards'
import type { BoardId, CampusTag, CourseTag } from '../types'

const VALID: BoardId[] = ['mall', 'fun', 'food', 'courses', 'campus']

export function ComposePage() {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { campus, meta: campusInfo } = useCampus()
  const { addPost } = useForum()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [courseName, setCourseName] = useState('')
  const [teacher, setTeacher] = useState('')
  const [courseTag, setCourseTag] = useState<CourseTag | ''>('')
  const [campusTag, setCampusTag] = useState<CampusTag | ''>('')
  const [error, setError] = useState('')

  if (!boardId || !VALID.includes(boardId as BoardId)) return <Navigate to="/" replace />
  const id = boardId as BoardId
  const meta = BOARDS[id]

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!user) return
    if (!title.trim() || !content.trim()) {
      setError('标题和正文都要写。')
      return
    }
    if (id === 'courses') {
      if (!courseName.trim() || !courseTag) {
        setError('选课攻略请填写课程名称，并选择类型（好课 / 壁垒 / 给分 / 避雷）。')
        return
      }
    }
    const post = addPost({
      boardId: id,
      title: title.trim(),
      content: content.trim(),
      authorId: user.id,
      campus,
      courseName: id === 'courses' ? courseName.trim() : undefined,
      teacher: id === 'courses' ? teacher.trim() || undefined : undefined,
      courseTag: id === 'courses' ? (courseTag as CourseTag) : undefined,
      campusTag: id === 'campus' ? campusTag || undefined : undefined,
    })
    navigate(`/post/${post.id}`)
  }

  return (
    <div className="compose">
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
        <Link to={`/board/${id}`}>
          {meta.emoji} {meta.name}
        </Link>
        <span>/</span>
        <span>发帖</span>
      </nav>

      <header className="page-head">
        <h1>
          写给{campusInfo.short} · {meta.name}
        </h1>
        <p>
          将发布到{campusInfo.name}。{meta.composeHint}
        </p>
      </header>

      <form className="compose-form" onSubmit={onSubmit}>
        {id === 'courses' && (
          <>
            <label>
              课程名称
              <input
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="请填写完整课程名，勿编造"
              />
            </label>
            <label>
              授课教师（选填）
              <input value={teacher} onChange={(e) => setTeacher(e.target.value)} placeholder="老师姓名" />
            </label>
            <p className="label-like">类型</p>
            <div className="chips">
              {COURSE_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  className={courseTag === tag.id ? 'chip on' : 'chip'}
                  onClick={() => setCourseTag(tag.id)}
                >
                  {tag.label}
                  <small>{tag.hint}</small>
                </button>
              ))}
            </div>
          </>
        )}

        {id === 'campus' && (
          <>
            <p className="label-like">标签（选填）</p>
            <div className="chips">
              {CAMPUS_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  className={campusTag === tag.id ? 'chip on' : 'chip'}
                  onClick={() => setCampusTag(tag.id === campusTag ? '' : tag.id)}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </>
        )}

        <label>
          标题
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="一句话说明重点" />
        </label>
        <label>
          正文
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            placeholder={meta.composeHint}
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <div className="compose-actions">
          <button className="primary-btn" type="submit">
            发布
          </button>
          <button className="ghost-btn" type="button" onClick={() => navigate(`/board/${id}`)}>
            取消
          </button>
        </div>
      </form>
    </div>
  )
}
