import { useState, type FormEvent } from 'react'

import { getApiErrorMessage } from '../../lib/apiError'
import { formatKm } from '../../lib/format'
import type { Vehicle } from '../../types/vehicle'
import { useCreateOdometerLog } from './useCreateOdometerLog'

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function OdometerForm({ vehicle }: { vehicle: Vehicle }) {
  const [value, setValue] = useState('')
  const [recordedAt, setRecordedAt] = useState(todayIso())
  const { mutate, isPending, error, isSuccess } = useCreateOdometerLog()

  const errorMessage = error ? getApiErrorMessage(error, 'Gagal mencatat odometer.') : null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    mutate(
      { vehicle: vehicle.id, value: Number(value), recorded_at: recordedAt, source: 'web' },
      { onSuccess: () => setValue('') },
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Catat Odometer</h2>
      <p className="mt-1 text-sm text-slate-500">
        Terkini: <span className="font-medium text-slate-700">{formatKm(vehicle.current_odometer)}</span>
      </p>

      <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="odo-value">
        Nilai odometer (km)
      </label>
      <input
        id="odo-value"
        type="number"
        inputMode="numeric"
        min={vehicle.current_odometer + 1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        placeholder={`> ${vehicle.current_odometer}`}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
      />

      <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="odo-date">
        Tanggal
      </label>
      <input
        id="odo-date"
        type="date"
        value={recordedAt}
        max={todayIso()}
        onChange={(e) => setRecordedAt(e.target.value)}
        required
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
      />

      {errorMessage && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
      )}
      {isSuccess && !errorMessage && (
        <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Odometer tersimpan.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-5 w-full rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white transition hover:bg-emerald-600 disabled:opacity-60"
      >
        {isPending ? 'Menyimpan…' : 'Simpan'}
      </button>
    </form>
  )
}
