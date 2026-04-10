import { API_BASE_URL } from "../infra/config/api";
export type CreateWorkOrderInput = {
  title: string;
  description?: string;
  priority: string;
};

export async function createWorkOrder(input: CreateWorkOrderInput) {
  const response = await fetch(`${API_BASE_URL}/work-orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(input),
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(
      data?.error || `Failed to create work order (${response.status})`,
    );
  }

  return data;
}
