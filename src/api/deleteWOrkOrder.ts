import { API_BASED_URL } from "../infra/config/api";

export async function deleteWorkOrder(id: string): Promise<void> {
  const response = await fetch(`${API_BASED_URL}/work-orders/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Delete faild with status ${response.status}`);
  }
}
