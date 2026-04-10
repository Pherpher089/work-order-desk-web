import { useState } from "react";
import { useCreateWorkOrder } from "../hooks/useCreateWorkOrder";

export function CreateWorkOrderForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const mutation = useCreateWorkOrder();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      {
        title,
        description: description || undefined,
        priority,
      },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setPriority("Medium");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Work Order</h2>

      <div className="form-group">
        <input
          className="form-control"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Optional description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="form-control"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create"}
      </button>
      {mutation.isError && (
        <p style={{ color: "red", marginTop: "8px" }}>
          {(mutation.error as Error).message}
        </p>
      )}
    </form>
  );
}
