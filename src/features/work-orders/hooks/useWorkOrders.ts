import { useQuery } from "@tanstack/react-query";
import { listWorkOrders } from "../../../api/listWorkOrders";
import type { WorkOrderListItem } from "../../../domain/work-orders/types";

export function useWorkOrders() {
  return useQuery<WorkOrderListItem[]>({
    queryKey: ["workOrders"],
    queryFn: listWorkOrders,
  });
}
