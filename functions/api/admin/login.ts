import { json, type Env } from '../../_lib/store'

export async function onRequestPost(context: { request: Request; env: Env }) {
  let password = ''
  try {
    const body = (await context.request.json()) as { password?: string }
    password = body.password?.trim() ?? ''
  } catch {
    return json({ error: '请输入密码' }, 400)
  }
  if (!context.env.ADMIN_PASSWORD) {
    return json({ error: '后台尚未设置密码' }, 503)
  }
  if (password !== context.env.ADMIN_PASSWORD) {
    return json({ error: '密码不对' }, 401)
  }
  return json({ ok: true })
}
