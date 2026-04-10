import { useWorkOrders } from "../../features/work-orders/hooks/useWorkOrders";
import { useDeleteWorkOrder } from "../../features/work-orders/hooks/useDeleteWorkOrder";
import { CreateWorkOrderForm } from "../../features/work-orders/components/CreateWorkOrderForm";
export function WorkOrdersPage() {
  const { data, isLoading, isError, error } = useWorkOrders();
  const deleteMutation = useDeleteWorkOrder();
  if (isLoading) {
    return <p>Loading workOrders...</p>;
  }

  if (isError) {
    return <p>Faild to load work orders: {(error as Error).message}</p>;
  }

  if (!data || data.length === 0) {
    return <p>No work orders yet</p>;
  }

  return (
    <main>
      <h1>Work Order Desk</h1>
      <CreateWorkOrderForm />
      <ul>
        {data.map((workOrder) => (
          <li>
            key={workOrder.id}
            <h2>{workOrder.title}</h2>
            <p>Status: {workOrder.status}</p>
            <p>Priority: {workOrder.priority}</p>
            {workOrder.description ? <p>{workOrder.description}</p> : null}
            <button
              onClick={() => deleteMutation.mutate(workOrder.id)}
              disabled={deleteMutation.isPending}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
