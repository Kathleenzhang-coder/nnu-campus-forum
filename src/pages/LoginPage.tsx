import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { MAJORS } from '../data/majors'
import { currentEnrollYears } from '../lib/format'

export function LoginPage() {
  const { authenticate } = useAuth()
  const navigate = useNavigate()
  const [realName, setRealName] = useState('')
  const [major, setMajor] = useState(MAJORS[0])
  const [customMajor, setCustomMajor] = useState('')
  const [enrollYear, setEnrollYear] = useState(currentEnrollYears()[0])
  const [error, setError] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const name = realName.trim()
    const chosenMajor = major === '其他' ? customMajor.trim() : major
    if (!name) {
      setError('请填写真实姓名，用于南师同学身份认证。')
      return
    }
    if (!chosenMajor) {
      setError('请填写专业。')
      return
    }
    const user = authenticate({ realName: name, major: chosenMajor, enrollYear })
    if (user.nickname && user.avatar) navigate('/')
    else navigate('/setup')
  }

  return (
    <div className="auth-screen">
      <div className="auth-art">
        <div className="auth-art-inner">
          <img className="auth-emblem" src="/nnu-emblem.png" alt="南京师范大学校徽" />
          <h1>南师柚园</h1>
          <p className="motto">正德厚生，笃学敏行</p>
          <p className="auth-lead">
            南京师范大学专属校园论坛。校园周边、选课攻略、校内生活，写给南师人，也只给南师人看。
          </p>
          <ul className="auth-points">
            <li>随园黄墙 · 仙林银门 · 紫金钟山</li>
            <li>先认证，再取昵称、选头像</li>
            <li>选课评价全部由同学填写</li>
          </ul>
        </div>
      </div>
      <form className="auth-panel" onSubmit={onSubmit}>
        <p className="eyebrow">身份认证</p>
        <h2>用南师身份进入柚园</h2>
        <p className="hint">请填写姓名、专业与入学年份。认证后可自行设置昵称和头像。</p>

        <label>
          姓名
          <input
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
            placeholder="与学籍一致的姓名"
            autoComplete="name"
          />
        </label>
        <label>
          专业
          <select value={major} onChange={(e) => setMajor(e.target.value)}>
            {MAJORS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        {major === '其他' && (
          <label>
            专业名称
            <input
              value={customMajor}
              onChange={(e) => setCustomMajor(e.target.value)}
              placeholder="请输入你的专业"
            />
          </label>
        )}
        <label>
          入学年份
          <select value={enrollYear} onChange={(e) => setEnrollYear(Number(e.target.value))}>
            {currentEnrollYears().map((y) => (
              <option key={y} value={y}>
                {y} 级
              </option>
            ))}
          </select>
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="primary-btn" type="submit">
          认证并继续
        </button>
        <p className="fineprint">认证信息将保存在本机，便于再次进入；不会上传到学校系统。</p>
      </form>
    </div>
  )
}
