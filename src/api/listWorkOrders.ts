import { getJason } from "../infra/http/apiClent";
import type { WorkOrderListItem } from "../domain/work-orders/types";
import { API_BASED_URL } from "../infra/config/api";

export function listWorkOrders(): Promise<WorkOrderListItem[]> {
  return getJason<WorkOrderListItem[]>(`${API_BASED_URL}/work-orders`);
}
