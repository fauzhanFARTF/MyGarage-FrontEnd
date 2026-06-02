import { useEffect, useState } from 'react'

import { MaintenanceForm } from '../features/maintenance/MaintenanceForm'
import { MaintenanceList } from '../features/maintenance/MaintenanceList'
import { MaintenanceStatusCards } from '../features/maintenance/MaintenanceStatusCards'
import {
  useMaintenanceLogs,
  useMaintenanceStatus,
  useMaintenanceTypes,
} from '../features/maintenance/useMaintenance'
import { useVehicles } from '../features/vehicles/useVehicles'

export function MaintenancePage() {
  const { data: vehicles, isLoading: loadingVehicles, isError: vehiclesError } = useVehicles()
  const { data: types } = useMaintenanceTypes()
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    if (selectedId === null && vehicles && vehicles.length > 0) {
      setSelectedId(vehicles[0].id)
    }
  }, [vehicles, selectedId])

  const { data: logs, isLoading: loadingLogs } = useMaintenanceLogs(selectedId)
  const { data: statusItems } = useMaintenanceStatus(selectedId)
  const selectedVehicle = vehicles?.find((v) => v.id === selectedId) ?? null

  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Servis</h1>
        <p className="text-sm text-slate-500">Catat servis & pantau jatuh tempo perawatan</p>
      </header>

      {loadingVehicles && <StateBox>Memuat kendaraan…</StateBox>}
      {vehiclesError && <StateBox tone="error">Gagal memuat kendaraan.</StateBox>}
      {vehicles && vehicles.length === 0 && <StateBox>Belum ada kendaraan terdaftar.</StateBox>}

      {selectedVehicle && (
        <>
          {vehicles && vehicles.length > 1 && (
            <div className="mb-5">
              <label className="mr-2 text-sm font-medium text-slate-700" htmlFor="mnt-vehicle">
                Kendaraan
              </label>
              <select
                id="mnt-vehicle"
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

          <section className="mb-5">
            <h2 className="mb-3 text-sm font-medium text-slate-700">Status jatuh tempo</h2>
            <MaintenanceStatusCards items={statusItems ?? []} />
          </section>

          <div className="grid gap-5 lg:grid-cols-2">
            <MaintenanceForm vehicle={selectedVehicle} types={types ?? []} />
            {loadingLogs ? (
              <StateBox>Memuat riwayat…</StateBox>
            ) : (
              <MaintenanceList logs={logs ?? []} vehicleId={selectedVehicle.id} />
            )}
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
