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
import { useCustomers } from "../hooks/useCustomers";
import { customerProjectsApi } from "../api/customerProjects";
import { useQueryClient } from "@tanstack/react-query";
import type { Project } from "../types/project";

interface AddCustomerToProjectDialogProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}

export function AddCustomerToProjectDialog({
  open,
  onClose,
  project,
}: AddCustomerToProjectDialogProps) {
  const { data: customers = [] } = useCustomers();
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | "">("");
  const queryClient = useQueryClient();

  const existingCustomerIds =
    project?.customer_projects?.map((cp) => cp.customer_id) || [];

  const availableCustomers = customers.filter(
    (c) => !existingCustomerIds.includes(c.id)
  );

  const handleSubmit = async () => {
    if (!selectedCustomerId || !project) return;

    try {
      await customerProjectsApi.create({
        customer_id: selectedCustomerId as number,
        project_id: project.id,
      });

      queryClient.invalidateQueries({ queryKey: ["projects"] });
      onClose();
      setSelectedCustomerId("");
    } catch (error) {
      console.error("Failed to add customer to project:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Legg til kunde</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>Velg kunde</InputLabel>
          <Select
            value={selectedCustomerId}
            label="Velg kunde"
            onChange={(e) => setSelectedCustomerId(e.target.value as number)}
          >
            {availableCustomers.map((customer) => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.name}
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
          disabled={!selectedCustomerId}
        >
          Legg til
        </Button>
      </DialogActions>
    </Dialog>
  );
}
