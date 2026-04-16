import { API_BASE_URL } from "../infra/config/api";
import type { WorkOrderDetails } from "../domain/work-orders/types";

export async function getWorkOrderById(id: string): Promise<WorkOrderDetails> {
  const response = await fetch(`${API_BASE_URL}/work-orders/${id}`, {
    headers: {
      Accept: "application/json",
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(
      data?.error || `Failed to load work order (${response.status})`,
    );
  }

  return data as WorkOrderDetails;
}
