import { isAdmin, json, readStore, type Env } from '../../_lib/store'

export async function onRequestGet(context: { request: Request; env: Env }) {
  if (!isAdmin(context.request, context.env)) {
    return json({ error: '没有审核权限' }, 401)
  }
  const store = await readStore(context.env)
  return json({ posts: store.posts })
}
