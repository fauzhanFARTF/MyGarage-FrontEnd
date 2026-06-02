const ACCESS_TOKEN_KEY = 'garasiku.access_token'

/** Helper penyimpanan token JWT. Halaman login (Fase 0) akan memanggil setToken. */
export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export function clearAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}
