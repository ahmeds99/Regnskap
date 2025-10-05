import { useQuery } from "@tanstack/react-query";
import { costsApi } from "../api/costs";

export function useCustomerCosts() {
  return useQuery({
    queryKey: ["customerCosts"],
    queryFn: costsApi.getAllCustomers,
  });
}
