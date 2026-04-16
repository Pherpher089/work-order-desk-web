import { useState } from "react";
import { CreateWorkOrderForm } from "../../features/work-orders/components/CreateWorkOrderForm";
import { WorkOrderForm } from "../../features/work-orders/components/WorkOrderForm";
import { useDeleteWorkOrder } from "../../features/work-orders/hooks/useDeleteWorkOrder";
import { useUpdateWorkOrder } from "../../features/work-orders/hooks/useUpdateWorkOrder";
import { useWorkOrderDetails } from "../../features/work-orders/hooks/useWorkOrderDetails";
import { useWorkOrders } from "../../features/work-orders/hooks/useWorkOrders";
import type {
  WorkOrderPriority,
  WorkOrderStatus,
} from "../../domain/work-orders/types";
import logo from "../../../assets/logo.png";

export function WorkOrdersPage() {
  const { data, isLoading, isError, error } = useWorkOrders();
  const deleteMutation = useDeleteWorkOrder();
  const updateMutation = useUpdateWorkOrder();

  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    data: editingWorkOrder,
    isLoading: isLoadingDetials,
    isError: isDetialsError,
    error: detailsError,
  } = useWorkOrderDetails(editingId);

  if (isLoading) {
    return <p>Loading workOrders...</p>;
  }

  if (isError) {
    return <p>Faild to load work orders: {(error as Error).message}</p>;
  }

  const hanldeDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleStartEdit = (id: string) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  if (!data || data.length === 0) {
    return <p>No work orders yet</p>;
  }

  const handleSubmitEdit = (values: {
    title: string;
    description: string;
    priority: WorkOrderPriority;
    status?: WorkOrderStatus;
  }) => {
    if (!editingId || !editingWorkOrder) {
      return;
    }

    updateMutation.mutate(
      {
        id: editingId,
        title: values.title,
        description: values.description,
        priority: values.priority,
        status: values.status ?? editingWorkOrder.status,
        assigneeId: editingWorkOrder.assigneeId,
      },
      {
        onSuccess: () => {
          setEditingId(null);
        },
      },
    );
  };

  return (
    <main>
      <header className="header">
        <img src={logo} alt="Work Order Desk" className="logo" />
        <h1>Work Order Desk</h1>
      </header>

      {editingId ? (
        isLoadingDetials ? (
          <p>Loading work order details...</p>
        ) : isDetialsError ? (
          <p>
            Faild to load work order details: {(detailsError as Error).message}
          </p>
        ) : editingWorkOrder ? (
          <WorkOrderForm
            mode="edit"
            initialValues={{
              title: editingWorkOrder.title,
              description: editingWorkOrder.description ?? "",
              priority: editingWorkOrder.priority,
              status: editingWorkOrder.status,
            }}
            isSubmitting={updateMutation.isPending}
            errorMessage={
              updateMutation.isError
                ? (updateMutation.error as Error).message
                : null
            }
            onSubmit={handleSubmitEdit}
            onCancel={handleCancelEdit}
          />
        ) : null
      ) : (
        <CreateWorkOrderForm />
      )}

      {!data || data.length === 0 ? (
        <p>No work orders yet.</p>
      ) : (
        <ul>
          {data.map((workOrder) => (
            <li
              key={workOrder.id}
              className={editingId === workOrder.id ? "selected-card" : ""}
            >
              <h2>{workOrder.title}</h2>
              <p>Status: {workOrder.status}</p>
              <p>Priority: {workOrder.priority}</p>

              {workOrder.description && <p>{workOrder.description}</p>}
              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => handleStartEdit(workOrder.id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => hanldeDelete(workOrder.id)}
                  disabled={deleteMutation.isPending}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
