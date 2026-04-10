import { getJason } from "../infra/http/apiClent";
import type { WorkOrderListItem } from "../domain/work-orders/types";
import { API_BASE_URL } from "../infra/config/api";

export function listWorkOrders(): Promise<WorkOrderListItem[]> {
  return getJason<WorkOrderListItem[]>(`${API_BASE_URL}/work-orders`);
}
