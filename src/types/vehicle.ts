// Mirror dari VehicleSerializer/VehicleTypeSerializer (apps/vehicles/serializers.py).

export type VehicleCategory = 'car' | 'motorcycle'

export interface VehicleType {
  id: number
  name: string
  category: VehicleCategory
}

export interface Vehicle {
  id: number
  name: string
  plate: string
  year: number
  vehicle_type: number
  vehicle_type_detail: VehicleType
  current_odometer: number
  created_at: string
  updated_at: string
}

export interface CreateVehicleInput {
  name: string
  plate: string
  year: number
  vehicle_type: number
}

export type UpdateVehicleInput = Partial<CreateVehicleInput>
