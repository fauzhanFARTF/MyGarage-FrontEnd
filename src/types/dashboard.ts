// Tipe ini mirror dari serializer backend (apps/dashboard/serializers.py).

export type VehicleCategory = 'car' | 'motorcycle'
export type OdometerSource = 'telegram' | 'web'

export interface UsagePoint {
  date: string // YYYY-MM-DD
  distance: number
}

export interface RecentLog {
  recorded_at: string // YYYY-MM-DD
  value: number
  source: OdometerSource
}

export interface VehicleUsage {
  id: number
  name: string
  plate: string
  year: number
  type_name: string
  category: VehicleCategory
  current_odometer: number
  logs_count: number
  first_recorded_at: string | null
  last_recorded_at: string | null
  total_distance: number
  window_distance: number
  window_days_recorded: number
  window_avg_daily_distance: number
  usage_series: UsagePoint[]
  recent_logs: RecentLog[]
}

export interface UsageDashboard {
  generated_at: string
  window_days: number
  window_start: string
  vehicles: VehicleUsage[]
}
