import { useState } from 'react'

import { VehicleCard } from '../features/vehicles/VehicleCard'
import { VehicleForm } from '../features/vehicles/VehicleForm'
import { useVehicleTypes } from '../features/vehicles/useVehicleTypes'
import { useVehicles } from '../features/vehicles/useVehicles'
import type { Vehicle } from '../types/vehicle'

interface FormState {
  open: boolean
  vehicle?: Vehicle
}

export function VehiclesPage() {
  const { data: vehicles, isLoading, isError } = useVehicles()
  const { data: vehicleTypes } = useVehicleTypes()
  const [form, setForm] = useState<FormState>({ open: false })

  function closeForm() {
    setForm({ open: false })
  }

  return (
    <>
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kendaraan</h1>
          <p className="text-sm text-slate-500">Kelola daftar kendaraanmu</p>
        </div>
        {!form.open && (
          <button
            type="button"
            onClick={() => setForm({ open: true })}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600"
          >
            Tambah Kendaraan
          </button>
        )}
      </header>

      {form.open && (
        <div className="mb-6">
          {vehicleTypes ? (
            <VehicleForm
              vehicleTypes={vehicleTypes}
              vehicle={form.vehicle}
              onSuccess={closeForm}
              onCancel={closeForm}
            />
          ) : (
            <StateBox>Memuat tipe kendaraan…</StateBox>
          )}
        </div>
      )}

      {isLoading && <StateBox>Memuat kendaraan…</StateBox>}
      {isError && <StateBox tone="error">Gagal memuat kendaraan.</StateBox>}
      {vehicles && vehicles.length === 0 && !form.open && (
        <StateBox>Belum ada kendaraan. Klik "Tambah Kendaraan" untuk mulai.</StateBox>
      )}

      {vehicles && vehicles.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2">
          {vehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} onEdit={(vehicle) => setForm({ open: true, vehicle })} />
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
  tone?: 'neutral' | 'error'
}) {
  const toneClass =
    tone === 'error'
      ? 'border-red-200 bg-red-50 text-red-700'
      : 'border-slate-200 bg-white text-slate-600'
  return <div className={`rounded-xl border p-6 text-center text-sm ${toneClass}`}>{children}</div>
}
