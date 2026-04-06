import { useWorkOrders } from "../../features/work-orders/hooks/useWorkOrders";

export function WorkOrdersPage() {
  const { data, isLoading, isError, error } = useWorkOrders();

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
      <ul>
        {data.map((workOrder) => (
          <li>
            key={workOrder.id}
            <h2>{workOrder.title}</h2>
            <p>Status: {workOrder.status}</p>
            <p>Priority: {workOrder.priority}</p>
            {workOrder.description ? <p>{workOrder.description}</p> : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
