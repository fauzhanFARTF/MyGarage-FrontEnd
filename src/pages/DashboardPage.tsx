import { useState } from 'react'

import { useUsageDashboard } from '../features/dashboard/useUsageDashboard'
import { VehicleUsageCard } from '../features/dashboard/VehicleUsageCard'

const WINDOW_OPTIONS = [7, 30, 90] as const

export function DashboardPage() {
  const [days, setDays] = useState<number>(30)
  const { data, isLoading, isError } = useUsageDashboard(days)

  return (
    <>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Monitoring Penggunaan Kendaraan</h1>
          <p className="text-sm text-slate-500">Ringkasan pemakaian dari data odometer</p>
        </div>
        <div className="flex gap-1 rounded-lg border border-slate-200 bg-white p-1">
          {WINDOW_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setDays(opt)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                days === opt ? 'bg-emerald-500 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {opt} hari
            </button>
          ))}
        </div>
      </header>

      {isLoading && <StateBox>Memuat data…</StateBox>}

      {isError && (
        <StateBox tone="error">Gagal memuat data. Pastikan backend berjalan dan coba lagi.</StateBox>
      )}

      {data && data.vehicles.length === 0 && (
        <StateBox>Belum ada kendaraan terdaftar.</StateBox>
      )}

      {data && data.vehicles.length > 0 && (
        <div className="grid gap-5 lg:grid-cols-2">
          {data.vehicles.map((v) => (
            <VehicleUsageCard key={v.id} vehicle={v} windowDays={data.window_days} />
          ))}
        </div>
      )}
    </>
  )
}

function StateBox({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode
  tone?: 'neutral' | 'warning' | 'error'
}) {
  const toneClass = {
    neutral: 'border-slate-200 bg-white text-slate-600',
    warning: 'border-amber-200 bg-amber-50 text-amber-700',
    error: 'border-red-200 bg-red-50 text-red-700',
  }[tone]
  return (
    <div className={`rounded-xl border p-6 text-center text-sm ${toneClass}`}>{children}</div>
  )
}
