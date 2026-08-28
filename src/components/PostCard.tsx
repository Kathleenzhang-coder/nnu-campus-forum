import { Link } from 'react-router-dom'
import { CAMPUS_TAGS, COURSE_TAGS } from '../data/boards'
import { timeAgo, yearLabel } from '../lib/format'
import { resolveAuthor } from '../lib/storage'
import type { Post, User } from '../types'
import { Avatar } from './Avatar'

type Props = {
  post: Post
  users: User[]
  commentCount?: number
}

export function PostCard({ post, users, commentCount = 0 }: Props) {
  const author = resolveAuthor(post.authorId, users)
  const courseTag = COURSE_TAGS.find((t) => t.id === post.courseTag)
  const campusTag = CAMPUS_TAGS.find((t) => t.id === post.campusTag)

  return (
    <Link className="post-card" to={`/post/${post.id}`}>
      <div className="post-card-top">
        {post.pinned && <span className="badge pin">置顶</span>}
        {courseTag && <span className={`badge tag-${post.courseTag}`}>{courseTag.label}</span>}
        {campusTag && <span className="badge muted">{campusTag.label}</span>}
        {post.campus && <span className="badge campus">{post.campus}</span>}
      </div>
      <h3>{post.title}</h3>
      {post.courseName && (
        <p className="course-line">
          {post.courseName}
          {post.teacher ? ` · ${post.teacher}` : ''}
        </p>
      )}
      <p className="excerpt">{post.content}</p>
      <div className="post-meta">
        <Avatar avatar={author.avatar} size={28} alt={author.nickname} />
        <span>{author.nickname}</span>
        <span className="dot">·</span>
        <span>
          {author.major} {yearLabel(author.enrollYear)}
        </span>
        <span className="grow" />
        <span>{commentCount} 评</span>
        <span>{post.likes.length} 赞</span>
        <span>{timeAgo(post.createdAt)}</span>
      </div>
    </Link>
  )
}
