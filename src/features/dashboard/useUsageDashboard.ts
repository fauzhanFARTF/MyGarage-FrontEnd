import { useQuery } from '@tanstack/react-query'

import { fetchUsageDashboard } from '../../api/dashboardApi'

/** Hook React Query untuk dashboard penggunaan kendaraan. */
export function useUsageDashboard(days: number) {
  return useQuery({
    queryKey: ['usage-dashboard', days],
    queryFn: () => fetchUsageDashboard(days),
  })
}
