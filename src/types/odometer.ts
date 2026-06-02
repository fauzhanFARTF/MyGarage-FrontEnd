// Mirror dari OdometerLogSerializer (apps/odometer/serializers.py).

export type OdometerSource = 'telegram' | 'web'

export interface OdometerLog {
  id: number
  vehicle: number
  recorded_at: string // YYYY-MM-DD
  value: number
  source: OdometerSource
  created_at: string
}

export interface CreateOdometerLogInput {
  vehicle: number
  recorded_at: string
  value: number
  source: OdometerSource
}
