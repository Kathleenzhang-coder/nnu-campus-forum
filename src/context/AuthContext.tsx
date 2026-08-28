import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { AuthPayload, User } from '../types'
import { loadSessionId, loadUsers, saveSessionId, saveUsers, uid } from '../lib/storage'

type AuthContextValue = {
  user: User | null
  users: User[]
  authenticate: (payload: AuthPayload) => User
  completeProfile: (nickname: string, avatar: string) => void
  updateProfile: (nickname: string, avatar: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function isProfileReady(user: User | null) {
  return Boolean(user?.nickname.trim() && user?.avatar)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => loadUsers())
  const [sessionId, setSessionId] = useState<string | null>(() => loadSessionId())

  const user = users.find((u) => u.id === sessionId) ?? null

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      users,
      authenticate: ({ realName, major, enrollYear }) => {
        const name = realName.trim()
        const existing = users.find(
          (u) => u.realName === name && u.major === major && u.enrollYear === enrollYear,
        )
        if (existing) {
          setSessionId(existing.id)
          saveSessionId(existing.id)
          return existing
        }
        const created: User = {
          id: uid(),
          realName: name,
          major,
          enrollYear,
          nickname: '',
          avatar: '',
          createdAt: new Date().toISOString(),
        }
        const next = [...users, created]
        setUsers(next)
        saveUsers(next)
        setSessionId(created.id)
        saveSessionId(created.id)
        return created
      },
      completeProfile: (nickname, avatar) => {
        if (!user) return
        const next = users.map((u) =>
          u.id === user.id ? { ...u, nickname: nickname.trim(), avatar } : u,
        )
        setUsers(next)
        saveUsers(next)
      },
      updateProfile: (nickname, avatar) => {
        if (!user) return
        const next = users.map((u) =>
          u.id === user.id ? { ...u, nickname: nickname.trim(), avatar } : u,
        )
        setUsers(next)
        saveUsers(next)
      },
      logout: () => {
        setSessionId(null)
        saveSessionId(null)
      },
    }),
    [user, users],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth 必须在 AuthProvider 内使用')
  return ctx
}

export function useProfileReady() {
  const { user } = useAuth()
  return isProfileReady(user)
}
