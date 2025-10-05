import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customersApi } from "../api/customers";
import type { UpdateCustomerRequest } from "../types/customer";

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCustomerRequest }) =>
      customersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}
