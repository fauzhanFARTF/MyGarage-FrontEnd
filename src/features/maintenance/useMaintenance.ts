import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createMaintenanceLog,
  deleteMaintenanceLog,
  fetchMaintenanceLogs,
  fetchMaintenanceStatus,
  fetchMaintenanceTypes,
} from '../../api/maintenanceApi'
import type { CreateMaintenanceLogInput } from '../../types/maintenance'

export function useMaintenanceTypes() {
  return useQuery({
    queryKey: ['maintenance-types'],
    queryFn: fetchMaintenanceTypes,
    staleTime: 5 * 60_000,
  })
}

export function useMaintenanceLogs(vehicleId: number | null) {
  return useQuery({
    queryKey: ['maintenance-logs', vehicleId],
    queryFn: () => fetchMaintenanceLogs(vehicleId as number),
    enabled: vehicleId !== null,
  })
}

export function useMaintenanceStatus(vehicleId: number | null) {
  return useQuery({
    queryKey: ['maintenance-status', vehicleId],
    queryFn: () => fetchMaintenanceStatus(vehicleId as number),
    enabled: vehicleId !== null,
  })
}

function useInvalidateMaintenance(vehicleId: number) {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: ['maintenance-logs', vehicleId] })
    queryClient.invalidateQueries({ queryKey: ['maintenance-status', vehicleId] })
    queryClient.invalidateQueries({ queryKey: ['vehicles'] })
    queryClient.invalidateQueries({ queryKey: ['usage-dashboard'] })
  }
}

export function useCreateMaintenanceLog(vehicleId: number) {
  const invalidate = useInvalidateMaintenance(vehicleId)
  return useMutation({
    mutationFn: (input: CreateMaintenanceLogInput) => createMaintenanceLog(input),
    onSuccess: invalidate,
  })
}

export function useDeleteMaintenanceLog(vehicleId: number) {
  const invalidate = useInvalidateMaintenance(vehicleId)
  return useMutation({
    mutationFn: (id: number) => deleteMaintenanceLog(id),
    onSuccess: invalidate,
  })
}
