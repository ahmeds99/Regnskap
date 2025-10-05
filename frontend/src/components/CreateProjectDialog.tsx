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
import { useState } from "react";
import { useCreateProject } from "../hooks/useCreateProject";
import type { ProjectStatus } from "../types/project";

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
}

const statusOptions: ProjectStatus[] = ["Pågående", "Avsluttet", "Planlagt"];

export function CreateProjectDialog({
  open,
  onClose,
}: CreateProjectDialogProps) {
  const createProject = useCreateProject();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("Planlagt");

  const isFormValid = name.trim() !== "";

  const handleSubmit = () => {
    if (!isFormValid) return;

    createProject.mutate(
      { name, description, status },
      {
        onSuccess: () => {
          onClose();
          setName("");
          setDescription("");
          setStatus("Planlagt");
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Opprett nytt prosjekt</DialogTitle>
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
          Opprett
        </Button>
      </DialogActions>
    </Dialog>
  );
}
