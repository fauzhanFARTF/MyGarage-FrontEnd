// Mirror dari apps/documents/serializers.py.

export type DocumentType = 'stnk' | 'pajak_5_tahun' | 'sim' | 'asuransi' | 'lainnya'

export const DOCUMENT_TYPE_LABEL: Record<DocumentType, string> = {
  stnk: 'STNK (tahunan)',
  pajak_5_tahun: 'Pajak 5 tahunan (plat)',
  sim: 'SIM',
  asuransi: 'Asuransi',
  lainnya: 'Lainnya',
}

export interface VehicleDocument {
  id: number
  vehicle: number | null
  doc_type: DocumentType
  name: string
  expiry_date: string // YYYY-MM-DD
  notes: string
  created_at: string
  updated_at: string
}

export interface CreateDocumentInput {
  vehicle: number | null
  doc_type: DocumentType
  name: string
  expiry_date: string
  notes: string
}

export type DocumentStatusLevel = 'expired' | 'upcoming' | 'ok'

export interface DocumentStatus {
  id: number
  doc_type: DocumentType
  name: string
  vehicle: number | null
  vehicle_name: string | null
  expiry_date: string
  days_remaining: number
  status: DocumentStatusLevel
}
