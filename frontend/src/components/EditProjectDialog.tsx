import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useUpdateProject } from "../hooks/useUpdateProject";
import type { Project, ProjectStatus } from "../types/project";

interface EditProjectDialogProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}

const statusOptions: ProjectStatus[] = ["Pågående", "Avsluttet", "Planlagt"];

export function EditProjectDialog({
  open,
  onClose,
  project,
}: EditProjectDialogProps) {
  const updateProject = useUpdateProject();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("Planlagt");

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description || "");
      setStatus(project.status);
    }
  }, [project]);

  const isFormValid = name.trim() !== "";

  const handleSubmit = () => {
    if (!isFormValid || !project) return;

    updateProject.mutate(
      { id: project.id, data: { name, description, status } },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Rediger prosjekt</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Navn"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Beskrivelse"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Avbryt</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!isFormValid}
          color={!isFormValid && name !== "" ? "error" : "primary"}
        >
          Lagre
        </Button>
      </DialogActions>
    </Dialog>
  );
}
