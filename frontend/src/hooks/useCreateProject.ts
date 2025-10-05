import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../api/projects";
import type { CreateProjectRequest } from "../types/project";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: CreateProjectRequest) =>
      projectsApi.create(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
