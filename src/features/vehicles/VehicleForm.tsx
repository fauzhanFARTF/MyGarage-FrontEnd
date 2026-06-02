import { useState, type FormEvent } from 'react'

import { getApiErrorMessage } from '../../lib/apiError'
import type { Vehicle, VehicleType } from '../../types/vehicle'
import { useCreateVehicle, useUpdateVehicle } from './useVehicleMutations'

interface Props {
  vehicleTypes: VehicleType[]
  vehicle?: Vehicle
  onSuccess: () => void
  onCancel: () => void
}

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'

export function VehicleForm({ vehicleTypes, vehicle, onSuccess, onCancel }: Props) {
  const isEdit = vehicle !== undefined
  const [name, setName] = useState(vehicle?.name ?? '')
  const [plate, setPlate] = useState(vehicle?.plate ?? '')
  const [year, setYear] = useState(String(vehicle?.year ?? new Date().getFullYear()))
  const [vehicleTypeId, setVehicleTypeId] = useState(String(vehicle?.vehicle_type ?? ''))

  const createMutation = useCreateVehicle()
  const updateMutation = useUpdateVehicle()
  const activeMutation = isEdit ? updateMutation : createMutation
  const errorMessage = activeMutation.error
    ? getApiErrorMessage(activeMutation.error, 'Gagal menyimpan kendaraan.')
    : null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const input = { name, plate, year: Number(year), vehicle_type: Number(vehicleTypeId) }
    if (isEdit) {
      updateMutation.mutate({ id: vehicle.id, input }, { onSuccess })
    } else {
      createMutation.mutate(input, { onSuccess })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        {isEdit ? 'Edit Kendaraan' : 'Tambah Kendaraan'}
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="v-name">
            Nama
          </label>
          <input id="v-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="v-plate">
            Plat nomor
          </label>
          <input id="v-plate" type="text" value={plate} onChange={(e) => setPlate(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="v-year">
            Tahun
          </label>
          <input
            id="v-year"
            type="number"
            min={1900}
            max={new Date().getFullYear() + 1}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="v-type">
            Tipe
          </label>
          <select
            id="v-type"
            value={vehicleTypeId}
            onChange={(e) => setVehicleTypeId(e.target.value)}
            required
            className={inputClass}
          >
            <option value="" disabled>
              Pilih tipe…
            </option>
            {vehicleTypes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {errorMessage && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
      )}

      <div className="mt-5 flex gap-2">
        <button
          type="submit"
          disabled={activeMutation.isPending}
          className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white transition hover:bg-emerald-600 disabled:opacity-60"
        >
          {activeMutation.isPending ? 'Menyimpan…' : 'Simpan'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-200 px-4 py-2 font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Batal
        </button>
      </div>
    </form>
  )
}
