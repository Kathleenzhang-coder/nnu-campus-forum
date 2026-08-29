import { useRef, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCampus } from '../context/CampusContext'
import { useForum } from '../context/ForumContext'
import { BOARDS, CAMPUS_TAGS, COURSE_TAGS } from '../data/boards'
import { fileToImageSrc, fileToVideoSrc } from '../lib/media'
import type { BoardId, CampusTag, CourseTag, MediaItem } from '../types'

const VALID: BoardId[] = ['mall', 'fun', 'food', 'courses', 'campus']

export function ComposePage() {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { campus, meta: campusInfo } = useCampus()
  const { addPost } = useForum()
  const imageRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [media, setMedia] = useState<MediaItem[]>([])
  const [videoUrl, setVideoUrl] = useState('')
  const [courseName, setCourseName] = useState('')
  const [teacher, setTeacher] = useState('')
  const [courseTag, setCourseTag] = useState<CourseTag | ''>('')
  const [campusTag, setCampusTag] = useState<CampusTag | ''>('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (!boardId || !VALID.includes(boardId as BoardId)) return <Navigate to="/" replace />
  const id = boardId as BoardId
  const meta = BOARDS[id]

  async function addImage(file: File | undefined) {
    if (!file) return
    try {
      const src = await fileToImageSrc(file)
      setMedia((list) => [...list, { id: crypto.randomUUID(), kind: 'image' as const, src }].slice(0, 4))
      setError('')
    } catch {
      setError('图片读取失败，请换一张。')
    }
  }

  async function addVideoFile(file: File | undefined) {
    if (!file) return
    try {
      const src = await fileToVideoSrc(file)
      setMedia((list) => {
        const withoutVideo = list.filter((item) => item.kind !== 'video')
        return [...withoutVideo, { id: crypto.randomUUID(), kind: 'video' as const, src }]
      })
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : '视频读取失败。')
    }
  }

  function addVideoLink() {
    const url = videoUrl.trim()
    if (!url) return
    if (!/^https?:\/\//i.test(url)) {
      setError('视频链接需要以 http 或 https 开头。')
      return
    }
    setMedia((list) => {
      const withoutVideo = list.filter((item) => item.kind !== 'video')
      return [...withoutVideo, { id: crypto.randomUUID(), kind: 'video' as const, src: url }]
    })
    setVideoUrl('')
    setError('')
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!user) return
    const hasBody = Boolean(content.trim()) || media.length > 0
    if (!hasBody) {
      setError('正文必填：请写文字，或添加图片 / 视频。标题可以不写。')
      return
    }
    if (id === 'courses') {
      if (!courseName.trim() || !courseTag) {
        setError('选课攻略请填写课程名称，并选择类型（好课 / 壁垒 / 给分 / 避雷）。')
        return
      }
    }
    setBusy(true)
    try {
      const post = await addPost({
        boardId: id,
        title: title.trim(),
        content: content.trim(),
        media,
        authorId: user.id,
        author: {
          id: user.id,
          nickname: user.nickname,
          avatar: user.avatar,
          major: user.major,
          enrollYear: user.enrollYear,
        },
        authorRealName: user.realName,
        campus,
        courseName: id === 'courses' ? courseName.trim() : undefined,
        teacher: id === 'courses' ? teacher.trim() || undefined : undefined,
        courseTag: id === 'courses' ? (courseTag as CourseTag) : undefined,
        campusTag: id === 'campus' ? campusTag || undefined : undefined,
      })
      navigate(`/post/${post.id}`)
    } catch {
      setError('发布失败，请稍后再试。')
      setBusy(false)
    }
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
          将发布到{campusInfo.name}。标题选填；正文必填，可以是文字、图片或视频。{meta.composeHint}
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
          标题（选填）
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="可以不写，不写也能发帖" />
        </label>
        <label>
          正文（必填）
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder="写文字，或在下方添加图片、视频。至少有一种内容才能发布。"
          />
        </label>

        <div className="media-pick">
          <input
            ref={imageRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              void addImage(e.target.files?.[0])
              e.target.value = ''
            }}
          />
          <input
            ref={videoRef}
            type="file"
            accept="video/*"
            hidden
            onChange={(e) => {
              void addVideoFile(e.target.files?.[0])
              e.target.value = ''
            }}
          />
          <button type="button" className="ghost-btn" onClick={() => imageRef.current?.click()}>
            添加图片
          </button>
          <button type="button" className="ghost-btn" onClick={() => videoRef.current?.click()}>
            上传视频
          </button>
        </div>
        <div className="upload-row">
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="或粘贴视频链接"
          />
          <button type="button" className="ghost-btn" onClick={addVideoLink}>
            添加链接
          </button>
        </div>
        {media.length > 0 && (
          <div className="media-preview">
            {media.map((item) => (
              <div key={item.id} className="media-preview-item">
                {item.kind === 'image' ? (
                  <img src={item.src} alt="" />
                ) : (
                  <span className="badge">视频</span>
                )}
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => setMedia((list) => list.filter((m) => m.id !== item.id))}
                >
                  去掉
                </button>
              </div>
            ))}
          </div>
        )}

        {error && <p className="form-error">{error}</p>}
        <div className="compose-actions">
          <button className="primary-btn" type="submit" disabled={busy}>
            {busy ? '发布中…' : '发布'}
          </button>
          <button className="ghost-btn" type="button" onClick={() => navigate(`/board/${id}`)}>
            取消
          </button>
        </div>
      </form>
    </div>
  )
}
