import axios from 'axios'

import { getAccessToken } from './auth'

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

// Lampirkan JWT (jika ada) ke setiap request. Token diisi oleh alur login (Fase 0).
api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
