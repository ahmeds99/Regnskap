import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Box } from "@mui/material";

export const Route = createRootRoute({
  component: () => (
    <Box sx={{ bgcolor: "white", minHeight: "100vh" }}>
      <Outlet />
    </Box>
  ),
});
