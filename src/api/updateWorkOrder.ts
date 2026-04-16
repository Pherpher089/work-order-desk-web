import { API_BASE_URL } from "../infra/config/api";
import type { WorkOrderDetails } from "../domain/work-orders/types";
import type { UpdateWorkOrderInput } from "./workOrders.types";
export async function updateWorkOrder(
  input: UpdateWorkOrderInput,
): Promise<WorkOrderDetails> {
  const response = await fetch(`${API_BASE_URL}/work-orders/${input.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      title: input.title,
      description: input.description,
      priority: input.priority,
      status: input.status,
      assigneeId: input.assigneeId,
    }),
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(
      data?.error || `Faild to update work order (${response.status})`,
    );
  }

  return data as WorkOrderDetails;
}
