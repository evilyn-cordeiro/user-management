import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Typography,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { userService } from "../../services/users.service";
import UserForm from "../UserForm/userForm.page";
import { Header, Navbar, UserTable } from "../../components";

interface User {
  id: number;
  name: string;
  email: string;
  type: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await userService.getAll();
    setUsers(data as User[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await userService.remove(id);
      fetchUsers();
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === "all" || user.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [users, search, filterType]);

  const userName = "Admin";

  return (
    <Box>
      <Header
        userName={userName}
        onLogout={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      />
      <Navbar open={drawerOpen} setOpen={setDrawerOpen} />
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          width: "100%",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            ml: `${300}px`, // espaço para não ficar atrás do Navbar
            display: "flex",
          }}
        >
          <TextField
            select
            label="Filter by kind"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </TextField>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedUser(null);
              setOpenForm(true);
            }}
          >
            New User
          </Button>
        </Box>

        <UserTable
          users={filteredUsers}
          loading={loading}
          onEdit={(user) => {
            setSelectedUser(user);
            setOpenForm(true);
          }}
          onDelete={handleDelete}
        />

        <Dialog
          open={openForm}
          onClose={() => setOpenForm(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogContent>
            <UserForm
              user={selectedUser || undefined}
              onSuccess={() => {
                fetchUsers();
                setOpenForm(false);
              }}
              onCancel={() => setOpenForm(false)}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}
