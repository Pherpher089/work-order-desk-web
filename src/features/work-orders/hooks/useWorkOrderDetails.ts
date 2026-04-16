import { useQuery } from "@tanstack/react-query";
import { getWorkOrderById } from "../../../api/getWorkOrderById";
import type { WorkOrderDetails } from "../../../domain/work-orders/types";

export function useWorkOrderDetails(id: string | null) {
  return useQuery<WorkOrderDetails>({
    queryKey: ["workOrder", id],
    queryFn: () => getWorkOrderById(id!),
    enabled: !!id,
  });
}
