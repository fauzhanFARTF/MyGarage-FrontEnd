import { useState, type FormEvent } from 'react'

import { getApiErrorMessage } from '../../lib/apiError'
import { formatKm } from '../../lib/format'
import type { MaintenanceType } from '../../types/maintenance'
import type { Vehicle } from '../../types/vehicle'
import { useCreateMaintenanceLog } from './useMaintenance'

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'

interface Props {
  vehicle: Vehicle
  types: MaintenanceType[]
}

export function MaintenanceForm({ vehicle, types }: Props) {
  const [maintenanceType, setMaintenanceType] = useState(String(types[0]?.id ?? ''))
  const [date, setDate] = useState(todayIso())
  const [odometer, setOdometer] = useState('')
  const [cost, setCost] = useState('')
  const [notes, setNotes] = useState('')

  const { mutate, isPending, error, isSuccess } = useCreateMaintenanceLog(vehicle.id)
  const errorMessage = error ? getApiErrorMessage(error, 'Gagal mencatat servis.') : null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    mutate(
      {
        vehicle: vehicle.id,
        maintenance_type: Number(maintenanceType),
        date,
        odometer: Number(odometer),
        cost: Number(cost || 0),
        notes,
      },
      {
        onSuccess: () => {
          setOdometer('')
          setCost('')
          setNotes('')
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Catat Servis</h2>
      <p className="mt-1 text-sm text-slate-500">
        Odometer terkini: <span className="font-medium text-slate-700">{formatKm(vehicle.current_odometer)}</span>
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700" htmlFor="m-type">Jenis servis</label>
          <select id="m-type" value={maintenanceType} onChange={(e) => setMaintenanceType(e.target.value)} required className={inputClass}>
            <option value="" disabled>Pilih jenis…</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="m-date">Tanggal</label>
          <input id="m-date" type="date" max={todayIso()} value={date} onChange={(e) => setDate(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="m-odo">Odometer (km)</label>
          <input id="m-odo" type="number" min={0} value={odometer} onChange={(e) => setOdometer(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="m-cost">Biaya (Rp)</label>
          <input id="m-cost" type="number" min={0} step="0.01" value={cost} onChange={(e) => setCost(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="m-notes">Catatan</label>
          <input id="m-notes" type="text" value={notes} onChange={(e) => setNotes(e.target.value)} className={inputClass} />
        </div>
      </div>

      {errorMessage && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
      )}
      {isSuccess && !errorMessage && (
        <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Servis tersimpan.</p>
      )}

      <button
        type="submit"
        disabled={isPending || types.length === 0}
        className="mt-5 w-full rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white transition hover:bg-emerald-600 disabled:opacity-60"
      >
        {isPending ? 'Menyimpan…' : 'Simpan'}
      </button>
    </form>
  )
}
