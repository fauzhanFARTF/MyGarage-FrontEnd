import { api } from '../lib/api'
import type { AuthUser, LoginCredentials, TokenPair } from '../types/auth'

/** Login → tukar kredensial dengan pasangan token JWT. */
export async function login(credentials: LoginCredentials): Promise<TokenPair> {
  const { data } = await api.post<TokenPair>('/auth/token/', credentials)
  return data
}

/** Profil user yang sedang login (butuh access token valid). */
export async function fetchMe(): Promise<AuthUser> {
  const { data } = await api.get<AuthUser>('/auth/me/')
  return data
}
