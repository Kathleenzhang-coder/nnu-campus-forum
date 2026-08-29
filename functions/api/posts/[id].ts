import { isAdmin, json, readStore, writeStore, type Env } from '../../_lib/store'

export async function onRequestDelete(context: {
  request: Request
  env: Env
  params: { id: string }
}) {
  if (!isAdmin(context.request, context.env)) {
    return json({ error: '没有审核权限' }, 401)
  }
  const id = context.params.id
  const store = await readStore(context.env)
  const next = store.posts.filter((p) => p.id !== id)
  if (next.length === store.posts.length) return json({ error: '帖子不存在' }, 404)
  await writeStore(context.env, { posts: next })
  return json({ ok: true })
}
