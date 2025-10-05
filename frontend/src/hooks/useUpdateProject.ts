import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../api/projects";
import type { UpdateProjectRequest } from "../types/project";

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProjectRequest }) =>
      projectsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
