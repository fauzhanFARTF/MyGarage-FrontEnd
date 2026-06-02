import type { TokenPair } from '../types/auth'

const ACCESS_TOKEN_KEY = 'garasiku.access_token'
const REFRESH_TOKEN_KEY = 'garasiku.refresh_token'

/** Event global saat sesi dipaksa berakhir (refresh token gagal/kedaluwarsa). */
export const AUTH_UNAUTHORIZED_EVENT = 'garasiku:unauthorized'

/** Helper penyimpanan token JWT (dipakai interceptor Axios & alur login). */
export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setAccessToken(access: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, access)
}

export function setTokens(tokens: TokenPair): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access)
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh)
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}
