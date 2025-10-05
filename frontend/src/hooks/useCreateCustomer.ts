import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customersApi } from "../api/customers";
import type { CreateCustomerRequest } from "../types/customer";

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customer: CreateCustomerRequest) =>
      customersApi.create(customer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}
