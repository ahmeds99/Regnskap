import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "@tanstack/react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useCustomers } from "../hooks/useCustomers";
import { CreateCustomerDialog } from "../components/CreateCustomerDialog";
import { useState } from "react";

export function Customers() {
  const { data: customers, isLoading } = useCustomers();
  const [open, setOpen] = useState(false);

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
                  <Typography variant="h6">{customer.name}</Typography>
                  <Typography color="text.secondary">
                    Org.nr - {customer.orgnr}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        <CreateCustomerDialog open={open} onClose={() => setOpen(false)} />
      </Box>
    </Container>
  );
}
