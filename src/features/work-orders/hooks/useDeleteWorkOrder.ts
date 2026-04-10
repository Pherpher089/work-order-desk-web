import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkOrder } from "../../../api/deleteWOrkOrder";

export function useDeleteWorkOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWorkOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workOrders"] });
    },
  });
}
