import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "@tanstack/react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function Customers() {
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
        {/* Customer content will go here */}
      </Box>
    </Container>
  );
}
