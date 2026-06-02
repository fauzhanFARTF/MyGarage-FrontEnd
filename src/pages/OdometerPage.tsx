import { useEffect, useState } from 'react'

import { OdometerForm } from '../features/odometer/OdometerForm'
import { OdometerList } from '../features/odometer/OdometerList'
import { useOdometerLogs } from '../features/odometer/useOdometerLogs'
import { useVehicles } from '../features/vehicles/useVehicles'

export function OdometerPage() {
  const { data: vehicles, isLoading: loadingVehicles, isError: vehiclesError } = useVehicles()
  const [selectedId, setSelectedId] = useState<number | null>(null)

  // Pilih kendaraan pertama secara otomatis saat data siap.
  useEffect(() => {
    if (selectedId === null && vehicles && vehicles.length > 0) {
      setSelectedId(vehicles[0].id)
    }
  }, [vehicles, selectedId])

  const { data: logs, isLoading: loadingLogs } = useOdometerLogs(selectedId)
  const selectedVehicle = vehicles?.find((v) => v.id === selectedId) ?? null

  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Odometer</h1>
        <p className="text-sm text-slate-500">Catat dan lihat riwayat kilometer kendaraan</p>
      </header>

      {loadingVehicles && <StateBox>Memuat kendaraan…</StateBox>}
      {vehiclesError && <StateBox tone="error">Gagal memuat kendaraan.</StateBox>}
      {vehicles && vehicles.length === 0 && <StateBox>Belum ada kendaraan terdaftar.</StateBox>}

      {selectedVehicle && (
        <>
          {vehicles && vehicles.length > 1 && (
            <div className="mb-5">
              <label className="mr-2 text-sm font-medium text-slate-700" htmlFor="vehicle-select">
                Kendaraan
              </label>
              <select
                id="vehicle-select"
                value={selectedId ?? ''}
                onChange={(e) => setSelectedId(Number(e.target.value))}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.plate})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            <OdometerForm vehicle={selectedVehicle} />
            {loadingLogs ? <StateBox>Memuat riwayat…</StateBox> : <OdometerList logs={logs ?? []} />}
          </div>
        </>
      )}
    </>
  )
}

function StateBox({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode
  tone?: 'neutral' | 'error'
}) {
  const toneClass =
    tone === 'error'
      ? 'border-red-200 bg-red-50 text-red-700'
      : 'border-slate-200 bg-white text-slate-600'
  return <div className={`rounded-xl border p-6 text-center text-sm ${toneClass}`}>{children}</div>
}
