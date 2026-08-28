import { DEFAULT_CAMPUS } from '../data/campuses'
import { OFFICIAL, SEED_COMMENTS, SEED_POSTS } from '../data/seed'
import type { Campus, Comment, Post, User } from '../types'

const KEYS = {
  users: 'nnu-youyuan-users',
  session: 'nnu-youyuan-session',
  posts: 'nnu-youyuan-posts-v2',
  comments: 'nnu-youyuan-comments',
  campus: 'nnu-youyuan-campus',
}

const CAMPUSES: Campus[] = ['仙林', '随园', '紫金']

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function uid() {
  return crypto.randomUUID()
}

export function loadUsers(): User[] {
  return read<User[]>(KEYS.users, [])
}

export function saveUsers(users: User[]) {
  write(KEYS.users, users)
}

export function loadSessionId(): string | null {
  return localStorage.getItem(KEYS.session)
}

export function saveSessionId(id: string | null) {
  if (id) localStorage.setItem(KEYS.session, id)
  else localStorage.removeItem(KEYS.session)
}

export function loadCampus(): Campus {
  const raw = localStorage.getItem(KEYS.campus)
  if (raw && CAMPUSES.includes(raw as Campus)) return raw as Campus
  return DEFAULT_CAMPUS
}

export function saveCampus(campus: Campus) {
  localStorage.setItem(KEYS.campus, campus)
}

export function loadPosts(): Post[] {
  const posts = read<Post[] | null>(KEYS.posts, null)
  if (!posts) {
    write(KEYS.posts, SEED_POSTS)
    return SEED_POSTS
  }
  return posts
}

export function savePosts(posts: Post[]) {
  write(KEYS.posts, posts)
}

export function loadComments(): Comment[] {
  const comments = read<Comment[] | null>(KEYS.comments, null)
  if (!comments) {
    write(KEYS.comments, SEED_COMMENTS)
    return SEED_COMMENTS
  }
  return comments
}

export function saveComments(comments: Comment[]) {
  write(KEYS.comments, comments)
}

export function resolveAuthor(authorId: string, users: User[]): User {
  if (authorId === OFFICIAL.id) return OFFICIAL
  return users.find((u) => u.id === authorId) ?? OFFICIAL
}

export async function fileToAvatarDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file)
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('无法处理图片')
  const min = Math.min(bitmap.width, bitmap.height)
  const sx = (bitmap.width - min) / 2
  const sy = (bitmap.height - min) / 2
  ctx.drawImage(bitmap, sx, sy, min, min, 0, 0, size, size)
  return canvas.toDataURL('image/jpeg', 0.85)
}
