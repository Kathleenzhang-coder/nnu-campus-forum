import { Navigate } from 'react-router-dom'
import { useAuth, useProfileReady } from '../context/AuthContext'
import type { ReactNode } from 'react'

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

export function RequireProfile({ children }: { children: ReactNode }) {
  const ready = useProfileReady()
  if (!ready) return <Navigate to="/setup" replace />
  return children
}

export function RedirectIfAuthed({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const ready = useProfileReady()
  if (user && ready) return <Navigate to="/" replace />
  if (user && !ready) return <Navigate to="/setup" replace />
  return children
}

export function RedirectIfProfileReady({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const ready = useProfileReady()
  if (!user) return <Navigate to="/login" replace />
  if (ready) return <Navigate to="/" replace />
  return children
}
