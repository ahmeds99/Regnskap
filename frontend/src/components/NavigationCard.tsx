import { Paper, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

interface NavigationCardProps {
  displayText: string;
  to: string;
}

export function NavigationCard({ displayText, to }: NavigationCardProps) {
  return (
    <Link to={to} style={{ textDecoration: "none", flex: 1 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          textAlign: "center",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-4px)",
            transition: "all 0.3s ease",
          },
        }}
      >
        <Typography variant="h4">{displayText}</Typography>
      </Paper>
    </Link>
  );
}
