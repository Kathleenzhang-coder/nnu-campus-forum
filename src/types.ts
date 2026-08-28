export type Campus = '仙林' | '随园' | '紫金'

export type BoardId = 'mall' | 'fun' | 'food' | 'courses' | 'campus'

export type CourseTag = 'recommend' | 'barrier' | 'grading' | 'warning'

export type CampusTag =
  | 'dorm'
  | 'club'
  | 'library'
  | 'news'
  | 'secondhand'
  | 'lost'
  | 'treehole'

export type User = {
  id: string
  realName: string
  major: string
  enrollYear: number
  nickname: string
  avatar: string
  createdAt: string
}

export type Post = {
  id: string
  boardId: BoardId
  title: string
  content: string
  authorId: string
  createdAt: string
  likes: string[]
  pinned?: boolean
  campus: Campus
  courseName?: string
  teacher?: string
  courseTag?: CourseTag
  campusTag?: CampusTag
}

export type Comment = {
  id: string
  postId: string
  authorId: string
  content: string
  createdAt: string
}

export type AuthPayload = {
  realName: string
  major: string
  enrollYear: number
}
