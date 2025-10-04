import { createFileRoute } from "@tanstack/react-router";
import { Box, Container } from "@mui/material";
import { NavigationCard } from "../components/NavigationCard";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: "100vh",
          gap: 14,
        }}
      >
        <NavigationCard displayText="Kunder" to="/customers" />
        <NavigationCard displayText="Prosjekter" to="/projects" />
      </Box>
    </Container>
  );
}
