import { useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { useAuth } from '../context/AuthContext'
import { AVATARS } from '../data/avatars'
import { fileToAvatarDataUrl } from '../lib/storage'
import { YouziMascot } from '../components/illos'

export function SetupPage() {
  const { user, completeProfile } = useAuth()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [nickname, setNickname] = useState(user?.nickname ?? '')
  const [avatar, setAvatar] = useState(user?.avatar || 'wisteria')
  const [error, setError] = useState('')

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
      setError('请设置一个昵称，进入柚园后会展示给其他同学。')
      return
    }
    if (!avatar) {
      setError('请选择或上传头像。')
      return
    }
    completeProfile(nickname, avatar)
    navigate('/')
  }

  return (
    <div className="setup-screen">
      <form className="setup-card" onSubmit={onSubmit}>
        <YouziMascot size={72} />
        <p className="eyebrow">完善资料</p>
        <h1>你好，{user?.realName}</h1>
        <p className="hint">
          {user?.major} · {user?.enrollYear} 级已认证。设置昵称和头像后，即可进入南师柚园。
        </p>

        <label>
          昵称
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="例如：随园散步的人"
            maxLength={16}
          />
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
              <Avatar avatar={item.id} size={52} />
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
            上传自己的头像
          </button>
          {avatar.startsWith('data:') && (
            <span className="upload-preview">
              <Avatar avatar={avatar} size={36} />
              已选用上传的图片
            </span>
          )}
        </div>

        {error && <p className="form-error">{error}</p>}
        <button className="primary-btn" type="submit">
          进入柚园
        </button>
      </form>
    </div>
  )
}
