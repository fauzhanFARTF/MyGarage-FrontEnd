import { NavLink, Outlet } from 'react-router-dom'

import { useAuth } from '../features/auth/AuthContext'

const linkBase = 'rounded-md px-3 py-1.5 text-sm font-medium transition'

function navClass({ isActive }: { isActive: boolean }) {
  return `${linkBase} ${
    isActive ? 'bg-emerald-500 text-white' : 'text-slate-600 hover:bg-slate-100'
  }`
}

export function AppLayout() {
  const { logout } = useAuth()
  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-slate-900">GarasiKu</span>
            <div className="flex gap-1">
              <NavLink to="/" end className={navClass}>
                Dashboard
              </NavLink>
              <NavLink to="/vehicles" className={navClass}>
                Kendaraan
              </NavLink>
              <NavLink to="/odometer" className={navClass}>
                Odometer
              </NavLink>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Keluar
          </button>
        </div>
      </nav>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
