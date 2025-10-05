import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useUpdateCustomer } from "../hooks/useUpdateCustomer";
import type { Customer } from "../types/customer";

interface EditCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  customer: Customer | null;
}

export function EditCustomerDialog({
  open,
  onClose,
  customer,
}: EditCustomerDialogProps) {
  const updateCustomer = useUpdateCustomer();
  const [name, setName] = useState("");

  useEffect(() => {
    if (customer) {
      setName(customer.name);
    }
  }, [customer]);

  const isFormValid = name.trim() !== "";

  const handleSubmit = () => {
    if (!isFormValid || !customer) return;

    updateCustomer.mutate(
      { id: customer.id, data: { name } },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Rediger kunde</DialogTitle>
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
          value={customer?.orgnr || ""}
          disabled
        />
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
