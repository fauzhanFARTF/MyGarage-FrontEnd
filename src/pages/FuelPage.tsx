import { useEffect, useState } from 'react'

import { ConsumptionChart } from '../features/fuel/ConsumptionChart'
import { FuelForm } from '../features/fuel/FuelForm'
import { FuelList } from '../features/fuel/FuelList'
import { useFuelLogs, useFuelSummary } from '../features/fuel/useFuel'
import { useVehicles } from '../features/vehicles/useVehicles'
import { formatRupiah } from '../lib/format'
import type { FuelSummary } from '../types/fuel'

export function FuelPage() {
  const { data: vehicles, isLoading: loadingVehicles, isError: vehiclesError } = useVehicles()
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    if (selectedId === null && vehicles && vehicles.length > 0) {
      setSelectedId(vehicles[0].id)
    }
  }, [vehicles, selectedId])

  const { data: logs, isLoading: loadingLogs } = useFuelLogs(selectedId)
  const { data: summary } = useFuelSummary(selectedId)
  const selectedVehicle = vehicles?.find((v) => v.id === selectedId) ?? null

  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">BBM</h1>
        <p className="text-sm text-slate-500">Catat pengisian & pantau konsumsi (full-to-full)</p>
      </header>

      {loadingVehicles && <StateBox>Memuat kendaraan…</StateBox>}
      {vehiclesError && <StateBox tone="error">Gagal memuat kendaraan.</StateBox>}
      {vehicles && vehicles.length === 0 && <StateBox>Belum ada kendaraan terdaftar.</StateBox>}

      {selectedVehicle && (
        <>
          {vehicles && vehicles.length > 1 && (
            <div className="mb-5">
              <label className="mr-2 text-sm font-medium text-slate-700" htmlFor="fuel-vehicle">
                Kendaraan
              </label>
              <select
                id="fuel-vehicle"
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

          {summary && <SummaryStats summary={summary} />}

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <FuelForm vehicle={selectedVehicle} />
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">Konsumsi (km/l)</h2>
              <ConsumptionChart segments={summary?.segments ?? []} />
            </div>
          </div>

          <div className="mt-5">
            {loadingLogs ? (
              <StateBox>Memuat riwayat…</StateBox>
            ) : (
              <FuelList logs={logs ?? []} vehicleId={selectedVehicle.id} />
            )}
          </div>
        </>
      )}
    </>
  )
}

function SummaryStats({ summary }: { summary: FuelSummary }) {
  const km = summary.avg_km_per_liter
  const cost = summary.avg_cost_per_km
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Stat label="Rata-rata konsumsi" value={km !== null ? `${km} km/l` : '—'} />
      <Stat label="Biaya per km" value={cost !== null ? formatRupiah(cost) : '—'} />
      <Stat label="Total pengeluaran" value={formatRupiah(summary.total_spend)} />
      <Stat label="Jumlah pengisian" value={String(summary.logs_count)} />
    </dl>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="text-lg font-semibold text-slate-900">{value}</dd>
    </div>
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
