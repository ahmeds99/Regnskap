import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Chip,
} from "@mui/material";
import { Link } from "@tanstack/react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useCustomers } from "../hooks/useCustomers";
import { CreateCustomerDialog } from "../components/CreateCustomerDialog";
import { EditCustomerDialog } from "../components/EditCustomerDialog";
import { AddProjectToCustomerDialog } from "../components/AddProjectToCustomerDialog";
import { useState } from "react";
import type { Customer } from "../types/customer";

export function Customers() {
  const { data: customers, isLoading } = useCustomers();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addProjectOpen, setAddProjectOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEditOpen(true);
  };

  const handleAddProject = (customer: Customer) => {
    setSelectedCustomer(customer);
    setAddProjectOpen(true);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button startIcon={<ArrowBackIcon />}>Tilbake</Button>
          </Link>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{
              backgroundColor: "success.main",
              "&:hover": { backgroundColor: "success.dark" },
            }}
          >
            Ny kunde
          </Button>
        </Box>

        <Typography variant="h1" sx={{ fontSize: "3rem", mb: 4 }}>
          Kunder
        </Typography>

        {isLoading ? (
          <Typography>Laster...</Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {customers?.map((customer) => (
              <Card key={customer.id}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">{customer.name}</Typography>
                      <Typography color="text.secondary">
                        Org.nr - {customer.orgnr}
                      </Typography>
                      <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {customer.customer_projects?.map((cp) => (
                          <Chip
                            key={cp.project_id}
                            label={cp.projects.name}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, ml: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleAddProject(customer)}
                      >
                        Legg til prosjekt
                      </Button>
                      <IconButton
                        onClick={() => handleEdit(customer)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        <CreateCustomerDialog open={open} onClose={() => setOpen(false)} />
        <EditCustomerDialog
          open={editOpen}
          onClose={() => setEditOpen(false)}
          customer={selectedCustomer}
        />
        <AddProjectToCustomerDialog
          open={addProjectOpen}
          onClose={() => setAddProjectOpen(false)}
          customer={selectedCustomer}
        />
      </Box>
    </Container>
  );
}
