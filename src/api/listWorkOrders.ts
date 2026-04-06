import { getJason } from "../infra/http/apiClent";
import type { WorkOrderListItem } from "../domain/work-orders/types";

const API_BASED_URL = "http://localhost:5273";

export function listWorkOrders(): Promise<WorkOrderListItem[]> {
  return getJason<WorkOrderListItem[]>(`${API_BASED_URL}/work-orders`);
}
