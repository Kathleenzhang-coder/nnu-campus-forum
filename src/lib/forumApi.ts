import type { Post } from '../types'

const ADMIN_KEY = 'nnu-youyuan-admin-key'

export type ForumStore = {
  posts: Post[]
}

export function getAdminKey() {
  return sessionStorage.getItem(ADMIN_KEY) ?? ''
}

export function setAdminKey(key: string) {
  sessionStorage.setItem(ADMIN_KEY, key)
}

export function clearAdminKey() {
  sessionStorage.removeItem(ADMIN_KEY)
}

export async function fetchRemotePosts(): Promise<Post[] | null> {
  try {
    const res = await fetch('/api/posts')
    if (!res.ok) return null
    const data = (await res.json()) as ForumStore
    return Array.isArray(data.posts) ? data.posts : null
  } catch {
    return null
  }
}

export async function createRemotePost(post: Post): Promise<Post | null> {
  try {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    })
    if (!res.ok) return null
    return (await res.json()) as Post
  } catch {
    return null
  }
}

export async function loginAdmin(password: string): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (!res.ok) return false
    setAdminKey(password)
    return true
  } catch {
    return false
  }
}

export async function fetchAdminPosts(): Promise<Post[] | null> {
  const key = getAdminKey()
  if (!key) return null
  try {
    const res = await fetch('/api/admin/posts', {
      headers: { 'x-admin-key': key },
    })
    if (!res.ok) return null
    const data = (await res.json()) as ForumStore
    return Array.isArray(data.posts) ? data.posts : null
  } catch {
    return null
  }
}

export async function deleteRemotePost(id: string): Promise<boolean> {
  const key = getAdminKey()
  if (!key) return false
  try {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-key': key },
    })
    return res.ok
  } catch {
    return false
  }
}
