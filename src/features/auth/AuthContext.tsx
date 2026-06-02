import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { login as loginApi } from '../../api/authApi'
import { clearTokens, getAccessToken, setTokens } from '../../lib/auth'
import type { LoginCredentials } from '../../types/auth'

interface AuthContextValue {
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => getAccessToken() !== null)

  const login = useCallback(async (credentials: LoginCredentials) => {
    const tokens = await loginApi(credentials)
    setTokens(tokens)
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(() => {
    clearTokens()
    setIsAuthenticated(false)
    queryClient.clear()
  }, [queryClient])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth harus dipakai di dalam AuthProvider')
  }
  return ctx
}
