import { useQuery } from '@tanstack/react-query'

import { fetchCostSummary } from '../../api/dashboardApi'

export function useCostSummary(months: number) {
  return useQuery({
    queryKey: ['cost-summary', months],
    queryFn: () => fetchCostSummary(months),
  })
}
