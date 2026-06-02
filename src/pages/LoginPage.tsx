import { useState, type FormEvent } from 'react'
import axios from 'axios'

import { useLogin } from '../features/auth/useLogin'

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { mutate, isPending, error } = useLogin()

  const errorMessage = resolveErrorMessage(error)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    mutate({ username, password })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-slate-900">Masuk ke GarasiKu</h1>
        <p className="mt-1 text-sm text-slate-500">Monitoring penggunaan kendaraan</p>

        <label className="mt-6 block text-sm font-medium text-slate-700" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />

        <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />

        {errorMessage && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-6 w-full rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white transition hover:bg-emerald-600 disabled:opacity-60"
        >
          {isPending ? 'Memproses…' : 'Masuk'}
        </button>
      </form>
    </div>
  )
}

function resolveErrorMessage(error: unknown): string | null {
  if (!error) return null
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      return 'Username atau password salah.'
    }
    if (!error.response) {
      return 'Tidak dapat terhubung ke server. Pastikan backend berjalan.'
    }
  }
  return 'Gagal masuk. Coba lagi.'
}
