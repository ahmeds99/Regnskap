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
import { useCustomers } from "../hooks/useCustomers";

export function Customers() {
  const { data: customers, isLoading } = useCustomers();

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
            Tilbake
          </Button>
        </Link>
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
      </Box>
    </Container>
  );
}
