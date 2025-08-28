import { useEffect, useState, useMemo } from "react";
import { Box, Button, Dialog, DialogContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { userService } from "../../services/users.service";
import UserForm from "../UserForm/userForm.page";

import { ConfirmationModal, Header, Navbar, UserTable } from "../../components";

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
  const [filterType] = useState<string>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await userService.getAll();
    setUsers(data as User[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id: number) => {
    setUserToDelete(id);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete !== null) {
      await userService.remove(userToDelete);
      fetchUsers();
      setOpenConfirmDialog(false);
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
    setUserToDelete(null);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesType = filterType === "all" || user.type === filterType;
      return matchesType;
    });
  }, [users, filterType]);

  const userName = "Admin";

  const RemoveToken = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Box
      sx={{
        ml: { xs: 0, md: "250px" },
      }}
    >
      <Header
        userName={userName}
        onLogout={() => {
          RemoveToken();
        }}
      />
      <Navbar open={drawerOpen} setOpen={setDrawerOpen} />
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "50px", background: "#233EAE" }}
            endIcon={<AddIcon />}
            onClick={() => {
              setSelectedUser(null);
              setOpenForm(true);
            }}
          >
            ADD NEW
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
      <ConfirmationModal
        open={openConfirmDialog}
        message="Are you sure you want to delete this user?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Box>
  );
}
