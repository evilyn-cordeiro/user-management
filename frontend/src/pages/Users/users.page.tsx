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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { userService } from "../../services/users.service";
import UserForm from "../UserForm/userForm.page";
import { Header, UserTable } from "../../components";

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

      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        <Box mb={3}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Management User
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Read, filter, and manage the users registered in the system.
          </Typography>
        </Box>

        <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
          <TextField
            label="Search user ..."
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1, minWidth: 200 }}
          />
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
          <DialogTitle>
            {selectedUser ? "Editar Usuário" : "Novo Usuário"}
          </DialogTitle>
          <DialogContent>
            <UserForm
              user={selectedUser || undefined}
              onSuccess={() => {
                fetchUsers();
                setOpenForm(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}
