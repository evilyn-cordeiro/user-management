import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Logo from "../Logo/logo";
import { LogoutOutlined } from "@mui/icons-material";

interface HeaderProps {
  userName: string;
  onLogout: () => void;
}

const getInitials = (name: string) => {
  const parts = name.split(" ");
  const initials =
    parts[0].charAt(0) +
    (parts.length > 1 ? parts[parts.length - 1].charAt(0) : "");
  return initials.toUpperCase();
};

export default function Header({ userName, onLogout }: HeaderProps) {
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
      width="100%"
      py={2}
      px={{ xs: 2, sm: 3 }}
      height={75}
      bgcolor="primary.main"
      color="white"
      flexWrap="wrap"
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          sx={{
            width: { xs: "30px", sm: "40px" },
            height: { xs: "30px", sm: "40px" },
          }}
        >
          <Logo />
        </Box>
      </Box>
      <Box display={"flex"} gap={1} alignItems="center">
        <Typography
          variant="h6"
          color="inherit"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          {userName}
        </Typography>
        <IconButton onClick={handleMenuOpen} color="inherit">
          <Avatar
            sx={{
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
              fontSize: { xs: "0.8rem", sm: "1.2rem" },
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
