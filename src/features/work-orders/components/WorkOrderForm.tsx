import { useState, useEffect } from "react";
import type {
  WorkOrderStatus,
  WorkOrderPriority,
} from "../../../domain/work-orders/types";

type WorkOrderFormValues = {
  title: string;
  description: string;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
};

type WorkOrderFromProps = {
  mode: "create" | "edit";
  initialValues?: Partial<WorkOrderFormValues>;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onSubmit: (values: WorkOrderFormValues) => void;
  onCancel?: () => void;
};

const defaultValues: WorkOrderFormValues = {
  title: "",
  description: "",
  priority: "Medium",
  status: "Open",
};

export function WorkOrderForm({
  mode,
  initialValues,
  isSubmitting = false,
  errorMessage = null,
  onSubmit,
  onCancel,
}: WorkOrderFromProps) {
  const [title, setTitle] = useState(defaultValues.title);
  const [description, setDescription] = useState(defaultValues.description);
  const [priority, setPriority] = useState<WorkOrderPriority>(
    defaultValues.priority,
  );
  const [status, setStatus] = useState<WorkOrderStatus>(defaultValues.status);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTitle(initialValues?.title ?? defaultValues.title);
    setDescription(initialValues?.description ?? defaultValues.description);
    setPriority(initialValues?.priority ?? defaultValues.priority);
    setStatus(initialValues?.status ?? defaultValues.status);
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      priority,
      status,
    });
  };

  const titleText = mode === "create" ? "Create Work Order" : "Edit Work Order";

  const buttonText = isSubmitting
    ? mode === "create"
      ? "Creating..."
      : "Saving..."
    : mode === "create"
      ? "Create Work Order"
      : "Save Changes";

  return (
    <form onSubmit={handleSubmit}>
      <h2>{titleText}</h2>

      <div className="form-group">
        <label>Title</label>
        <input
          className="form-control"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          className="form-control"
          placeholder="Optional description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Priority</label>
        <select
          className="form-control"
          value={priority}
          onChange={(e) => setPriority(e.target.value as WorkOrderPriority)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {mode === "edit" && (
        <div className="form-group">
          <label>Status</label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value as WorkOrderStatus)}
          >
            <option value="Backlog">Backlog</option>
            <option value="Open">Open</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      )}

      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {buttonText}
        </button>

        {mode === "edit" && onCancel && (
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      {errorMessage && <p className="form-error">{errorMessage}</p>}
    </form>
  );
}
