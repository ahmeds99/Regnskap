import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "@tanstack/react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useCustomerCosts } from "../hooks/useCustomerCosts";
import { formatCurrency } from "../utils/formatCurrency";
import { useState } from "react";

export function Costs() {
  const { data: customerCosts, isLoading } = useCustomerCosts();
  const [expandedCustomerId, setExpandedCustomerId] = useState<number | null>(
    null
  );

  const handleToggleExpand = (customerId: number) => {
    setExpandedCustomerId(
      expandedCustomerId === customerId ? null : customerId
    );
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button startIcon={<ArrowBackIcon />}>Tilbake</Button>
          </Link>
        </Box>

        <Typography variant="h1" sx={{ fontSize: "3rem", mb: 4 }}>
          Kostnadsoversikt
        </Typography>

        {isLoading ? (
          <Typography>Laster...</Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {customerCosts?.map((customer) => (
              <Card
                key={customer.id}
                sx={{
                  cursor:
                    customer.projects && customer.projects.length > 0
                      ? "pointer"
                      : "default",
                }}
              >
                <CardContent
                  onClick={() => {
                    if (customer.projects && customer.projects.length > 0) {
                      handleToggleExpand(customer.id);
                    }
                  }}
                >
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

                      <Typography variant="body1" mt={2}>
                        Totale kostnader: {formatCurrency(customer.total_cost)}{" "}
                        kr
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        Antall prosjekter: {customer.project_count}
                      </Typography>
                    </Box>

                    {customer.projects &&
                      customer.projects.length > 0 &&
                      (expandedCustomerId === customer.id ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      ))}
                  </Box>

                  <Collapse
                    in={expandedCustomerId === customer.id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Typography variant="subtitle2" sx={{ mb: 1, mt: 2 }}>
                      Kostnader per prosjekt:
                    </Typography>
                    <TableContainer component={Paper} variant="outlined">
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Prosjekt
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ fontWeight: "bold" }}
                            >
                              Kostnad
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {customer.projects?.map((project) => (
                            <TableRow key={project.project_id}>
                              <TableCell>{project.project_name}</TableCell>
                              <TableCell align="right">
                                {formatCurrency(project.total_cost)} kr
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Collapse>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}
