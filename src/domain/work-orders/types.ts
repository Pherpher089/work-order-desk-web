export type WorkOrderPriority = "Low" | "Medium" | "High";
export type WorkOrderStatus =
  | "Backlog"
  | "Open"
  | "InProgress"
  | "Completed"
  | "Archived";

export type WorkOrderListItem = {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  status: string;
  createdAtUtc: string;
  updatedAtUtc: string;
};

export type WorkOrderDetails = {
  id: string;
  title: string;
  description: string | null;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  assigneeId: string | null;
  createdAtUtc: string;
  updatedAtUtc: string;
  completedAtUtc: string | null;
  archivedAtUtc: string | null;
};
