import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { customerProjectsApi } from "../api/customerProjects";
import { useQueryClient } from "@tanstack/react-query";
import type { Project, ProjectStatus } from "../types/project";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onAddCustomer: (project: Project) => void;
}

const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case "Pågående":
      return "success";
    case "Planlagt":
      return "warning";
    case "Avsluttet":
      return "default";
    default:
      return "default";
  }
};

export function ProjectCard({
  project,
  onEdit,
  onAddCustomer,
}: ProjectCardProps) {
  const queryClient = useQueryClient();
  const [deletingCustomerId, setDeletingCustomerId] = useState<number | null>(
    null
  );

  const handleDeleteCustomer = async (
    customerId: number,
    customerName: string
  ) => {
    if (!window.confirm(`Fjern ${customerName} fra ${project.name}?`)) {
      return;
    }

    setDeletingCustomerId(customerId);
    try {
      await customerProjectsApi.deleteByIds(customerId, project.id);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    } catch (error) {
      console.error("Failed to remove customer from project:", error);
    } finally {
      setDeletingCustomerId(null);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="h6">{project.name}</Typography>
              <Chip
                label={project.status}
                size="small"
                color={getStatusColor(project.status)}
              />
            </Box>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              {project.description}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 0.5 }}>
              {project.customer_projects?.map((cp) => (
                <Chip
                  key={cp.customer_id}
                  label={cp.customers.name}
                  size="small"
                  variant="outlined"
                  onDelete={() =>
                    handleDeleteCustomer(cp.customer_id, cp.customers.name)
                  }
                  disabled={deletingCustomerId === cp.customer_id}
                  sx={{ mb: 1 }}
                />
              ))}
            </Box>
            <Button
              variant="outlined"
              size="small"
              onClick={() => onAddCustomer(project)}
            >
              Legg til kunde
            </Button>
          </Box>

          <IconButton onClick={() => onEdit(project)} color="primary">
            <EditIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
