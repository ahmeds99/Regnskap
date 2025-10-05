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
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: { xs: 4, md: 14 },
        }}
      >
        <NavigationCard displayText="Kunder" to="/customers" />
        <NavigationCard displayText="Prosjekter" to="/projects" />
        <NavigationCard displayText="Kostnader" to="/costs" />
      </Box>
    </Container>
  );
}
