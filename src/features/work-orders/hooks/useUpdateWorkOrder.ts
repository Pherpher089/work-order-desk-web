import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkOrder } from "../../../api/updateWorkOrder";

export function useUpdateWorkOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWorkOrder,
    onSuccess: (updateWorkOrder) => {
      queryClient.invalidateQueries({ queryKey: ["workOrders"] });
      queryClient.invalidateQueries({
        queryKey: ["workOrder", updateWorkOrder.id],
      });
    },
  });
}
