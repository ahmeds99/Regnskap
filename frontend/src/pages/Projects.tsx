import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { Link } from "@tanstack/react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useProjects } from "../hooks/useProjects";
import { CreateProjectDialog } from "../components/CreateProjectDialog";
import { useState } from "react";
import type { ProjectStatus } from "../types/project";

const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case "Pågående":
      return "success";
    case "Planlagt":
      return "warning";
    case "Avsluttet":
      return "default";
    default:
      return "default";
  }
};

export function Projects() {
  const { data: projects, isLoading } = useProjects();
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
            Nytt prosjekt
          </Button>
        </Box>

        <Typography variant="h1" sx={{ fontSize: "3rem", mb: 4 }}>
          Prosjekter
        </Typography>

        {isLoading ? (
          <Typography>Laster...</Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {projects?.map((project) => (
              <Card key={project.id}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6">{project.name}</Typography>
                    <Chip
                      label={project.status}
                      size="small"
                      color={getStatusColor(project.status)}
                    />
                  </Box>
                  <Typography color="text.secondary">
                    {project.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        <CreateProjectDialog open={open} onClose={() => setOpen(false)} />
      </Box>
    </Container>
  );
}
