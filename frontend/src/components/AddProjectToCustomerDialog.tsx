import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import { customerProjectsApi } from "../api/customerProjects";
import { useQueryClient } from "@tanstack/react-query";
import type { Customer } from "../types/customer";

interface AddProjectToCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  customer: Customer | null;
}

export function AddProjectToCustomerDialog({
  open,
  onClose,
  customer,
}: AddProjectToCustomerDialogProps) {
  const { data: projects = [] } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState<number | "">("");
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    if (!selectedProjectId || !customer) return;

    try {
      await customerProjectsApi.create({
        customer_id: customer.id,
        project_id: selectedProjectId as number,
      });

      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      onClose();
      setSelectedProjectId("");
    } catch (error) {
      console.error("Failed to add project to customer:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Legg til prosjekt</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>Velg prosjekt</InputLabel>
          <Select
            value={selectedProjectId}
            label="Velg prosjekt"
            onChange={(e) => setSelectedProjectId(e.target.value as number)}
          >
            {projects.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Avbryt</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!selectedProjectId}
        >
          Legg til
        </Button>
      </DialogActions>
    </Dialog>
  );
}
