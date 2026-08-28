import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { CAMPUSES, DEFAULT_CAMPUS, campusMeta } from '../data/campuses'
import { loadCampus, saveCampus } from '../lib/storage'
import type { Campus } from '../types'

type CampusContextValue = {
  campus: Campus
  meta: ReturnType<typeof campusMeta>
  setCampus: (campus: Campus) => void
  campuses: typeof CAMPUSES
}

const CampusContext = createContext<CampusContextValue | null>(null)

export function CampusProvider({ children }: { children: ReactNode }) {
  const [campus, setCampusState] = useState<Campus>(() => loadCampus())

  const value = useMemo<CampusContextValue>(
    () => ({
      campus,
      meta: campusMeta(campus),
      campuses: CAMPUSES,
      setCampus: (next) => {
        setCampusState(next)
        saveCampus(next)
      },
    }),
    [campus],
  )

  return <CampusContext.Provider value={value}>{children}</CampusContext.Provider>
}

export function useCampus() {
  const ctx = useContext(CampusContext)
  if (!ctx) throw new Error('useCampus 必须在 CampusProvider 内使用')
  return ctx
}

export { DEFAULT_CAMPUS }
