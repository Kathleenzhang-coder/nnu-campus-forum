import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCampus } from '../context/CampusContext'
import { Avatar } from './Avatar'
import { YouziMascot } from './illos'

export function Layout() {
  const { user, logout } = useAuth()
  const { campus, campuses, setCampus, meta } = useCampus()
  const navigate = useNavigate()

  return (
    <div className="shell" data-campus={campus}>
      <header className="topbar">
        <div className="campus-switch" role="tablist" aria-label="切换校区">
          {campuses.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={campus === item.id}
              className={campus === item.id ? 'campus-tab on' : 'campus-tab'}
              onClick={() => setCampus(item.id)}
            >
              {item.short}
            </button>
          ))}
        </div>
        <button className="brand" onClick={() => navigate('/')}>
          <span className="brand-seal">
            <YouziMascot size={36} />
          </span>
          <span>
            <strong>南师柚园</strong>
            <em>
              NNU · {meta.name}
            </em>
          </span>
        </button>
        <nav className="top-nav">
          <NavLink to="/" end>
            首页
          </NavLink>
          <NavLink to="/around">周边生活</NavLink>
          <NavLink to="/board/courses">选课攻略</NavLink>
          <NavLink to="/board/campus">校园生活</NavLink>
        </nav>
        {user && (
          <div className="user-chip">
            <button className="user-btn" onClick={() => navigate('/profile')}>
              <Avatar avatar={user.avatar} size={32} alt={user.nickname} />
              <span>
                <b>{user.nickname}</b>
                <small>
                  {user.major} · {user.enrollYear} 级
                </small>
              </span>
            </button>
            <button
              className="ghost-btn"
              onClick={() => {
                logout()
                navigate('/login')
              }}
            >
              退出
            </button>
          </div>
        )}
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="foot">
        <span className="foot-motto">正德厚生 · 笃学敏行</span>
        当前{meta.name} · 南师柚园仅供南京师范大学在校同学交流
      </footer>
    </div>
  )
}
