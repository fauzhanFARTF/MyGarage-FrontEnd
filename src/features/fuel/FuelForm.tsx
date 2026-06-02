import { useState, type FormEvent } from 'react'

import { getApiErrorMessage } from '../../lib/apiError'
import { formatKm } from '../../lib/format'
import { FUEL_TYPE_LABEL, type FuelType } from '../../types/fuel'
import type { Vehicle } from '../../types/vehicle'
import { useCreateFuelLog } from './useFuel'

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'

export function FuelForm({ vehicle }: { vehicle: Vehicle }) {
  const [date, setDate] = useState(todayIso())
  const [odometer, setOdometer] = useState('')
  const [fuelType, setFuelType] = useState<FuelType>('pertalite')
  const [liters, setLiters] = useState('')
  const [pricePerLiter, setPricePerLiter] = useState('')
  const [isFullTank, setIsFullTank] = useState(true)

  const { mutate, isPending, error, isSuccess } = useCreateFuelLog(vehicle.id)
  const errorMessage = error ? getApiErrorMessage(error, 'Gagal mencatat BBM.') : null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    mutate(
      {
        vehicle: vehicle.id,
        date,
        odometer: Number(odometer),
        fuel_type: fuelType,
        liters: Number(liters),
        price_per_liter: Number(pricePerLiter),
        is_full_tank: isFullTank,
      },
      {
        onSuccess: () => {
          setOdometer('')
          setLiters('')
          setPricePerLiter('')
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Catat Pengisian BBM</h2>
      <p className="mt-1 text-sm text-slate-500">
        Odometer terkini: <span className="font-medium text-slate-700">{formatKm(vehicle.current_odometer)}</span>
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="f-date">Tanggal</label>
          <input id="f-date" type="date" max={todayIso()} value={date} onChange={(e) => setDate(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="f-odo">Odometer (km)</label>
          <input id="f-odo" type="number" min={0} value={odometer} onChange={(e) => setOdometer(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="f-type">Jenis BBM</label>
          <select id="f-type" value={fuelType} onChange={(e) => setFuelType(e.target.value as FuelType)} className={inputClass}>
            {(Object.keys(FUEL_TYPE_LABEL) as FuelType[]).map((t) => (
              <option key={t} value={t}>{FUEL_TYPE_LABEL[t]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="f-liters">Liter</label>
          <input id="f-liters" type="number" step="0.01" min={0} value={liters} onChange={(e) => setLiters(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="f-price">Harga / liter (Rp)</label>
          <input id="f-price" type="number" step="0.01" min={0} value={pricePerLiter} onChange={(e) => setPricePerLiter(e.target.value)} required className={inputClass} />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input type="checkbox" checked={isFullTank} onChange={(e) => setIsFullTank(e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
            Tangki penuh (full tank)
          </label>
        </div>
      </div>

      {errorMessage && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
      )}
      {isSuccess && !errorMessage && (
        <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">BBM tersimpan.</p>
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
