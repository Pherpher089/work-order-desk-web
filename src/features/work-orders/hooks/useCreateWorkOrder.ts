import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkOrder } from "../../../api/createWorkOrders";

export function useCreateWorkOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workOrders"] });
    },
  });
}
