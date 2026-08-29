import { json, publicPost, readStore, writeStore, type Env } from '../_lib/store'
import type { Post } from '../../src/types'

export async function onRequestGet(context: { env: Env }) {
  const store = await readStore(context.env)
  return json({ posts: store.posts.map(publicPost) })
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  let body: Post
  try {
    body = (await context.request.json()) as Post
  } catch {
    return json({ error: '内容格式不对' }, 400)
  }

  const hasBody = Boolean(body.content?.trim()) || (Array.isArray(body.media) && body.media.length > 0)
  if (!hasBody) return json({ error: '正文必填，请写文字或添加图片、视频。' }, 400)
  if (!body.boardId || !body.campus || !body.authorId) {
    return json({ error: '缺少发帖信息' }, 400)
  }

  const post: Post = {
    ...body,
    id: body.id || crypto.randomUUID(),
    title: (body.title ?? '').trim(),
    content: (body.content ?? '').trim(),
    media: Array.isArray(body.media) ? body.media.slice(0, 5) : [],
    createdAt: body.createdAt || new Date().toISOString(),
    likes: Array.isArray(body.likes) ? body.likes : [],
  }

  const store = await readStore(context.env)
  store.posts = [post, ...store.posts.filter((p) => p.id !== post.id)]
  await writeStore(context.env, store)
  return json(publicPost(post), 201)
}
