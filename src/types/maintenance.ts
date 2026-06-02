// Mirror dari serializer apps/maintenance/serializers.py.

export interface MaintenanceType {
  id: number
  name: string
  category: string
  default_interval_km: number | null
  default_interval_days: number | null
}

export interface MaintenanceLog {
  id: number
  vehicle: number
  maintenance_type: number
  maintenance_type_detail: MaintenanceType
  date: string // YYYY-MM-DD
  odometer: number
  cost: number
  notes: string
  created_at: string
}

export interface CreateMaintenanceLogInput {
  vehicle: number
  maintenance_type: number
  date: string
  odometer: number
  cost: number
  notes: string
}

export type MaintenanceStatusLevel = 'overdue' | 'upcoming' | 'ok' | 'unknown'

export interface MaintenanceStatus {
  maintenance_type_id: number
  maintenance_type_name: string
  last_date: string
  last_odometer: number
  km_remaining: number | null
  days_remaining: number | null
  status: MaintenanceStatusLevel
}
