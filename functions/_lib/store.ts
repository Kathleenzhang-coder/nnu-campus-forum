import { SEED_POSTS } from '../../src/data/seed'
import type { Post } from '../../src/types'

export type Env = {
  FORUM: KVNamespace
  ADMIN_PASSWORD: string
}

export type ForumStore = {
  posts: Post[]
}

const KEY = 'forum:v1'

export async function readStore(env: Env): Promise<ForumStore> {
  const raw = await env.FORUM.get(KEY)
  if (!raw) {
    const fresh = { posts: SEED_POSTS }
    await writeStore(env, fresh)
    return fresh
  }
  try {
    const data = JSON.parse(raw) as ForumStore
    return { posts: Array.isArray(data.posts) ? data.posts : [] }
  } catch {
    return { posts: [] }
  }
}

export async function writeStore(env: Env, store: ForumStore) {
  await env.FORUM.put(KEY, JSON.stringify(store))
}

export function publicPost(post: Post): Post {
  const { authorRealName: _hidden, ...rest } = post
  return rest
}

export function isAdmin(request: Request, env: Env) {
  const key = request.headers.get('x-admin-key') ?? ''
  return Boolean(env.ADMIN_PASSWORD) && key === env.ADMIN_PASSWORD
}

export function json(data: unknown, status = 200) {
  return Response.json(data, { status })
}
