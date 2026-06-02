import { api } from '../lib/api'
import type {
  CreateMaintenanceLogInput,
  MaintenanceLog,
  MaintenanceStatus,
  MaintenanceType,
} from '../types/maintenance'

export async function fetchMaintenanceTypes(): Promise<MaintenanceType[]> {
  const { data } = await api.get<MaintenanceType[]>('/maintenance-types/')
  return data
}

export async function fetchMaintenanceLogs(vehicleId: number): Promise<MaintenanceLog[]> {
  const { data } = await api.get<MaintenanceLog[]>('/maintenance-logs/', {
    params: { vehicle: vehicleId },
  })
  return data
}

export async function createMaintenanceLog(
  input: CreateMaintenanceLogInput,
): Promise<MaintenanceLog> {
  const { data } = await api.post<MaintenanceLog>('/maintenance-logs/', input)
  return data
}

export async function deleteMaintenanceLog(id: number): Promise<void> {
  await api.delete(`/maintenance-logs/${id}/`)
}

export async function fetchMaintenanceStatus(vehicleId: number): Promise<MaintenanceStatus[]> {
  const { data } = await api.get<MaintenanceStatus[]>('/maintenance/status/', {
    params: { vehicle: vehicleId },
  })
  return data
}
