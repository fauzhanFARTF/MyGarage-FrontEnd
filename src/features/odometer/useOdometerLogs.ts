import { useQuery } from '@tanstack/react-query'

import { fetchOdometerLogs } from '../../api/odometerApi'

export function useOdometerLogs(vehicleId: number | null) {
  return useQuery({
    queryKey: ['odometer-logs', vehicleId],
    queryFn: () => fetchOdometerLogs(vehicleId as number),
    enabled: vehicleId !== null,
  })
}
