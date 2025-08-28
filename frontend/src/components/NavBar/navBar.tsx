import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import Logo from "../Logo/logo";

const navItems = [{ text: "Users", icon: <PersonIcon />, to: "/users" }];

interface NavbarProps {
  drawerWidth?: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({
  drawerWidth = 270,
  open,
  setOpen,
}: NavbarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { pathname } = useLocation();

  const drawerContent = (
    <Box sx={{ height: "100%", bgcolor: "#09143F", color: "#FFFFFF" }}>
      <Box sx={{ p: 2, bgcolor: "#1f2a55", marginBottom: "2rem" }}>
        <Logo />
      </Box>

      <List disablePadding>
        {navItems.map(({ text, icon, to }) => {
          const isSelected = pathname.startsWith(to);
          return (
            <ListItem
              key={text}
              disablePadding
              sx={{
                backgroundColor: isSelected ? "#DC3545" : "transparent",
                borderRadius: "0 60px 60px 0",
                width: "95%",
                mx: "auto",
                my: 0.5,
              }}
            >
              <ListItemButton
                component={Link}
                to={to}
                onClick={() => isMobile && setOpen(false)}
                sx={{
                  color: "#FFFFFF",
                  "& .MuiListItemIcon-root": { color: "#FFFFFF" },
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            top: 12,
            left: 12,
            zIndex: 1300,
            color: "#FFFFFF",
            bgcolor: "rgba(0, 0, 0, 0.6)",
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.8)" },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #EAECF0",
            bgcolor: "#09143F",
            color: "#FFFFFF",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
