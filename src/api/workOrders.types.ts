import type {
  WorkOrderPriority,
  WorkOrderStatus,
} from "../domain/work-orders/types";

export type CreateWorkOrderInput = {
  title: string;
  description?: string;
  priority: string;
};

export type UpdateWorkOrderInput = {
  id: string;
  title: string;
  description?: string;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  assigneeId?: string | null;
};
