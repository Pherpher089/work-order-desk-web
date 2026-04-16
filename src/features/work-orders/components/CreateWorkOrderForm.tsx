import type { CreateWorkOrderInput } from "../../../api/createWorkOrders";
import type { WorkOrderPriority } from "../../../domain/work-orders/types";
import { useCreateWorkOrder } from "../hooks/useCreateWorkOrder";
import { WorkOrderForm } from "./WorkOrderForm";

export function CreateWorkOrderForm() {
  const mutation = useCreateWorkOrder();

  const handleSubmit = (values: {
    title: string;
    description: string;
    priority: WorkOrderPriority;
  }) => {
    const input: CreateWorkOrderInput = {
      title: values.title,
      description: values.description,
      priority: values.priority,
    };

    mutation.mutate(input);
  };

  return (
    <WorkOrderForm
      mode="create"
      isSubmitting={mutation.isPending}
      errorMessage={mutation.isError ? (mutation.error as Error).message : null}
      onSubmit={handleSubmit}
    />
  );
}
