import { useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { useAuth } from '../context/AuthContext'
import { AVATARS } from '../data/avatars'
import { fileToAvatarDataUrl } from '../lib/storage'

export function ProfilePage() {
  const { user, updateProfile, logout } = useAuth()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [nickname, setNickname] = useState(user?.nickname ?? '')
  const [avatar, setAvatar] = useState(user?.avatar ?? 'wisteria')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  if (!user) return null

  async function onPickFile(file: File | undefined) {
    if (!file) return
    try {
      const data = await fileToAvatarDataUrl(file)
      setAvatar(data)
    } catch {
      setError('头像读取失败，请换一张图片。')
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!nickname.trim()) {
      setError('昵称不能为空。')
      return
    }
    updateProfile(nickname, avatar)
    setError('')
    setSaved(true)
  }

  return (
    <div className="profile">
      <header className="page-head">
        <p className="eyebrow">个人资料</p>
        <h1>昵称与头像</h1>
        <p>认证信息不可改。昵称和头像可以随时换。</p>
      </header>

      <div className="profile-grid">
        <section className="id-card">
          <Avatar avatar={avatar} size={72} alt={nickname} />
          <h2>{user.realName}</h2>
          <p>
            {user.major}
            <br />
            {user.enrollYear} 级 · 已认证
          </p>
        </section>

        <form className="compose-form" onSubmit={onSubmit}>
          <label>
            昵称
            <input value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={16} />
          </label>
          <p className="label-like">头像</p>
          <div className="avatar-grid">
            {AVATARS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={avatar === item.id ? 'avatar-pick on' : 'avatar-pick'}
                onClick={() => setAvatar(item.id)}
              >
                <Avatar avatar={item.id} size={48} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="upload-row">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => onPickFile(e.target.files?.[0])}
            />
            <button type="button" className="ghost-btn" onClick={() => fileRef.current?.click()}>
              上传头像
            </button>
          </div>
          {error && <p className="form-error">{error}</p>}
          {saved && <p className="form-ok">已保存。</p>}
          <div className="compose-actions">
            <button className="primary-btn" type="submit">
              保存修改
            </button>
            <button
              className="ghost-btn"
              type="button"
              onClick={() => {
                logout()
                navigate('/login')
              }}
            >
              退出认证
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
