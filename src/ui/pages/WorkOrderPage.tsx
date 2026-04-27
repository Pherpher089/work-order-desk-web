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

function priorityClass(priority: string) {
  return `badge badge--priority-${priority.toLowerCase()}`;
}

function statusClass(status: string) {
  return `badge badge--status-${status.toLowerCase()}`;
}

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
    return (
      <main>
        <p className="info-state">Loading workOrders...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <div className="info-state">
          Faild to load work orders: {(error as Error).message}
        </div>
      </main>
    );
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
        <div className="header-text">
          <h1>Work Order Desk</h1>
          <p className="subtitle">
            Lightweight internal tool for tracking work order status and
            priority.
          </p>
        </div>
      </header>

      {editingId ? (
        isLoadingDetials ? (
          <div className="info-state">Loading work order details...</div>
        ) : isDetialsError ? (
          <div className="info-state">
            Faild to load work order details: {(detailsError as Error).message}
          </div>
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
        <div className="empty-state">
          <strong>No work orders yet.</strong>
          <p style={{ marginBottom: 0 }}>
            Create your first work order to get started.
          </p>
        </div>
      ) : (
        <ul>
          {data.map((workOrder) => (
            <li
              key={workOrder.id}
              className={editingId === workOrder.id ? "selected-card" : ""}
            >
              <div className="card-header">
                <h2 className="card-title">{workOrder.title}</h2>
              </div>

              <div>
                <span className={priorityClass(workOrder.priority)}>
                  {workOrder.priority} Priority
                </span>
                <span className={statusClass(workOrder.status)}>
                  {workOrder.status}
                </span>
              </div>

              {workOrder.description && (
                <p className="card-description">{workOrder.description}</p>
              )}
              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => handleStartEdit(workOrder.id)}
                >
                  Edit
                </button>

                <button
                  className="danger-button"
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
