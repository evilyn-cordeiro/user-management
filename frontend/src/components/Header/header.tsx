import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderProps {
  userName: string;
  onLogout: () => void;
  onOpenMenu?: () => void;
}

const getInitials = (name: string) => {
  const parts = name.split(" ");
  const initials =
    parts[0].charAt(0) +
    (parts.length > 1 ? parts[parts.length - 1].charAt(0) : "");
  return initials.toUpperCase();
};

export default function Header({
  userName,
  onLogout,
  onOpenMenu,
}: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    onLogout();
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={2}
      px={{ xs: 2, sm: 3 }}
      height={{ xs: "auto", sm: 72 }}
      bgcolor="#ffffff"
      position="sticky"
      top={0}
      zIndex={1100}
      sx={{
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Left side: Menu button (mobile) + Title */}
      <Box display="flex" alignItems="center" gap={1}>
        {onOpenMenu && (
          <IconButton
            onClick={onOpenMenu}
            color="inherit"
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          fontWeight="bold"
          color="#050A24"
          noWrap
          sx={{ fontSize: { xs: "1.1rem", sm: "1.3rem" } }}
        >
          User Management
        </Typography>
      </Box>

      {/* Right side: User avatar and menu */}
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={handleMenuOpen} color="inherit">
          <Avatar
            sx={{
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
              fontSize: { xs: "0.8rem", sm: "1.2rem" },
              bgcolor: "#1570EF",
              color: "white",
            }}
          >
            {getInitials(userName)}
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogoutClick}>
            <LogoutOutlined sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
