import { useState, type FormEvent } from 'react'

import { getApiErrorMessage } from '../../lib/apiError'
import type { Vehicle } from '../../types/vehicle'
import { DOCUMENT_TYPE_LABEL, type DocumentType } from '../../types/document'
import { useCreateDocument } from './useDocuments'

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'

export function DocumentForm({ vehicles }: { vehicles: Vehicle[] }) {
  const [docType, setDocType] = useState<DocumentType>('stnk')
  const [name, setName] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [vehicleId, setVehicleId] = useState('')
  const [notes, setNotes] = useState('')

  const { mutate, isPending, error, isSuccess } = useCreateDocument()
  const errorMessage = error ? getApiErrorMessage(error, 'Gagal menyimpan dokumen.') : null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    mutate(
      {
        vehicle: vehicleId ? Number(vehicleId) : null,
        doc_type: docType,
        name,
        expiry_date: expiryDate,
        notes,
      },
      {
        onSuccess: () => {
          setName('')
          setExpiryDate('')
          setNotes('')
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Tambah Dokumen</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="d-type">Jenis</label>
          <select id="d-type" value={docType} onChange={(e) => setDocType(e.target.value as DocumentType)} className={inputClass}>
            {(Object.keys(DOCUMENT_TYPE_LABEL) as DocumentType[]).map((t) => (
              <option key={t} value={t}>{DOCUMENT_TYPE_LABEL[t]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="d-name">Nama</label>
          <input id="d-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="mis. STNK Avanza" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="d-expiry">Tanggal kedaluwarsa</label>
          <input id="d-expiry" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="d-vehicle">Kendaraan (opsional)</label>
          <select id="d-vehicle" value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} className={inputClass}>
            <option value="">— Tanpa kendaraan (mis. SIM) —</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>{v.name} ({v.plate})</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700" htmlFor="d-notes">Catatan</label>
          <input id="d-notes" type="text" value={notes} onChange={(e) => setNotes(e.target.value)} className={inputClass} />
        </div>
      </div>

      {errorMessage && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>}
      {isSuccess && !errorMessage && <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Dokumen tersimpan.</p>}

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
