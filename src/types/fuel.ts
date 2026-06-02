// Mirror dari FuelLogSerializer & FuelSummarySerializer (apps/fuel/serializers.py).

export type FuelType =
  | 'pertalite'
  | 'pertamax'
  | 'pertamax_turbo'
  | 'solar'
  | 'dexlite'
  | 'pertamina_dex'

export const FUEL_TYPE_LABEL: Record<FuelType, string> = {
  pertalite: 'Pertalite',
  pertamax: 'Pertamax',
  pertamax_turbo: 'Pertamax Turbo',
  solar: 'Solar',
  dexlite: 'Dexlite',
  pertamina_dex: 'Pertamina Dex',
}

export interface FuelLog {
  id: number
  vehicle: number
  date: string // YYYY-MM-DD
  odometer: number
  fuel_type: FuelType
  liters: number
  price_per_liter: number
  total_cost: number
  is_full_tank: boolean
  created_at: string
}

export interface CreateFuelLogInput {
  vehicle: number
  date: string
  odometer: number
  fuel_type: FuelType
  liters: number
  price_per_liter: number
  is_full_tank: boolean
}

export interface ConsumptionSegment {
  date: string
  distance: number
  liters: number
  km_per_liter: number
  cost_per_km: number
}

export interface FuelSummary {
  logs_count: number
  total_spend: number
  avg_km_per_liter: number | null
  avg_cost_per_km: number | null
  segments: ConsumptionSegment[]
}
