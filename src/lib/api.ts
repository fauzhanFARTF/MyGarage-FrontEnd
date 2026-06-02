import axios, { type InternalAxiosRequestConfig } from 'axios'

import {
  AUTH_UNAUTHORIZED_EVENT,
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setTokens,
} from './auth'

const baseURL = import.meta.env.VITE_API_BASE_URL

if (!baseURL) {
  // Gagal cepat saat dev kalau env belum diset, daripada error 404 yang membingungkan.
  console.warn('VITE_API_BASE_URL belum diset. Cek file .env (lihat .env.example).')
}

/**
 * Instance Axios terpusat untuk seluruh panggilan ke backend Django.
 * Base URL dibaca dari env VITE_API_BASE_URL.
 */
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Lampirkan JWT (jika ada) ke setiap request. Token diisi oleh alur login.
api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ─── Auto-refresh saat access token kedaluwarsa (401) ──────────────────────────

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

let isRefreshing = false
let pendingQueue: Array<(token: string | null) => void> = []

function flushQueue(token: string | null) {
  pendingQueue.forEach((resolve) => resolve(token))
  pendingQueue = []
}

function forceLogout() {
  clearTokens()
  window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT))
}

/** Tukar refresh token dengan access baru (pakai axios polos agar tak rekursif). */
async function refreshAccessToken(refresh: string): Promise<string> {
  const { data } = await axios.post<{ access: string; refresh?: string }>(
    `${baseURL}/auth/token/refresh/`,
    { refresh },
  )
  if (data.refresh) {
    setTokens({ access: data.access, refresh: data.refresh }) // rotasi token aktif di backend
  } else {
    setAccessToken(data.access)
  }
  return data.access
}

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error) || !error.response || !error.config) {
      return Promise.reject(error)
    }

    const original = error.config as RetryableConfig
    const isRefreshCall = original.url?.includes('/auth/token/refresh')

    if (error.response.status !== 401 || original._retry || isRefreshCall) {
      return Promise.reject(error)
    }

    const refresh = getRefreshToken()
    if (!refresh) {
      forceLogout()
      return Promise.reject(error)
    }

    original._retry = true

    // Sudah ada proses refresh berjalan → antrikan request ini.
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push((token) => {
          if (token) {
            original.headers.Authorization = `Bearer ${token}`
            resolve(api(original))
          } else {
            reject(error)
          }
        })
      })
    }

    isRefreshing = true
    try {
      const newAccess = await refreshAccessToken(refresh)
      flushQueue(newAccess)
      original.headers.Authorization = `Bearer ${newAccess}`
      return api(original)
    } catch (refreshError) {
      flushQueue(null)
      forceLogout()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)
