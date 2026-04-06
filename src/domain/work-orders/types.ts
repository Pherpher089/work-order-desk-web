export type WorkOrderListItem = {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  status: string;
  createdAtUtc: string;
  updatedAtUtc: string;
};
