import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "@tanstack/react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useProjects } from "../hooks/useProjects";
import { CreateProjectDialog } from "../components/CreateProjectDialog";
import { EditProjectDialog } from "../components/EditProjectDialog";
import { AddCustomerToProjectDialog } from "../components/AddCustomerToProjectDialog";
import { ProjectCard } from "../components/ProjectCard";
import { useState } from "react";
import type { Project } from "../types/project";

export function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setEditOpen(true);
  };

  const handleAddCustomer = (project: Project) => {
    setSelectedProject(project);
    setAddCustomerOpen(true);
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
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEdit}
                onAddCustomer={handleAddCustomer}
              />
            ))}
          </Box>
        )}

        <CreateProjectDialog open={open} onClose={() => setOpen(false)} />

        <EditProjectDialog
          open={editOpen}
          onClose={() => setEditOpen(false)}
          project={selectedProject}
        />

        <AddCustomerToProjectDialog
          open={addCustomerOpen}
          onClose={() => setAddCustomerOpen(false)}
          project={selectedProject}
        />
      </Box>
    </Container>
  );
}
