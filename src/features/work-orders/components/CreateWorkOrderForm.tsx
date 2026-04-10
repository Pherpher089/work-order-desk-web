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
    <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
      <h2>Create Work Order</h2>

      <div>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create"}
      </button>
      {mutation.isError && (
        <p style={{ color: "red" }}>{(mutation.error as Error).message}</p>
      )}
    </form>
  );
}
