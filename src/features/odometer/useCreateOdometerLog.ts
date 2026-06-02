import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createOdometerLog } from '../../api/odometerApi'
import type { CreateOdometerLogInput } from '../../types/odometer'

export function useCreateOdometerLog() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateOdometerLogInput) => createOdometerLog(input),
    onSuccess: (_data, variables) => {
      // Segarkan daftar log, cache kendaraan (current_odometer), dan dashboard.
      queryClient.invalidateQueries({ queryKey: ['odometer-logs', variables.vehicle] })
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
      queryClient.invalidateQueries({ queryKey: ['usage-dashboard'] })
    },
  })
}
