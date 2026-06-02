import axios from 'axios'

interface ApiErrorBody {
  error?: {
    code?: string
    message?: string
    details?: Record<string, unknown>
  }
}

/**
 * Ekstrak pesan error yang ramah dari respons backend (format §7 charter:
 * { error: { code, message, details } }). Mengutamakan pesan paling spesifik
 * di `details` (mis. validasi odometer), lalu `message`, lalu fallback.
 */
export function getApiErrorMessage(
  error: unknown,
  fallback = 'Terjadi kesalahan. Coba lagi.',
): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    if (!error.response) {
      return 'Tidak dapat terhubung ke server. Pastikan backend berjalan.'
    }
    const apiError = error.response.data?.error
    if (apiError) {
      const detailMsg = firstDetailMessage(apiError.details)
      if (detailMsg) return detailMsg
      if (apiError.message) return apiError.message
    }
  }
  return fallback
}

function firstDetailMessage(details: Record<string, unknown> | undefined): string | null {
  if (!details) return null
  for (const value of Object.values(details)) {
    if (typeof value === 'string') return value
    if (Array.isArray(value) && typeof value[0] === 'string') return value[0]
  }
  return null
}
