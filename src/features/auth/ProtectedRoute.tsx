import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from './AuthContext'

/** Hanya izinkan rute anak bila sudah login; jika tidak, alihkan ke /login. */
export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
