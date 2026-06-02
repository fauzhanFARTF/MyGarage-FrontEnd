import { useMutation } from '@tanstack/react-query'

import type { LoginCredentials } from '../../types/auth'
import { useAuth } from './AuthContext'

/** Mutation login — membungkus AuthContext.login agar dapat status pending/error. */
export function useLogin() {
  const { login } = useAuth()
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
  })
}
