import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useCreateCustomer } from "../hooks/useCreateCustomer";

interface CreateCustomerDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateCustomerDialog({
  open,
  onClose,
}: CreateCustomerDialogProps) {
  const createCustomer = useCreateCustomer();
  const [name, setName] = useState("");
  const [orgnr, setOrgnr] = useState("");

  const isValidOrgnr = orgnr.length === 9 && /^\d+$/.test(orgnr);
  const isFormValid = name.trim() !== "" && isValidOrgnr;

  const handleSubmit = () => {
    if (!isFormValid) return;

    createCustomer.mutate(
      { name, orgnr: Number(orgnr) },
      {
        onSuccess: () => {
          onClose();
          setName("");
          setOrgnr("");
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Opprett ny kunde</DialogTitle>
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
          label="Org.nr"
          fullWidth
          type="number"
          value={orgnr}
          onChange={(e) => setOrgnr(e.target.value)}
          error={orgnr !== "" && !isValidOrgnr}
          helperText={
            orgnr !== "" && !isValidOrgnr ? "Orgnr må være ni siffer" : ""
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Avbryt</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!isFormValid}
          color={
            !isFormValid && (name !== "" || orgnr !== "") ? "error" : "primary"
          }
        >
          Opprett
        </Button>
      </DialogActions>
    </Dialog>
  );
}
