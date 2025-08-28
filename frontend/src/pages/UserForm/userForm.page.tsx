import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Paper,
  Typography,
  Alert,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { userService } from "../../services/users.service";

interface UserFormProps {
  user?: { id?: number; name: string; email: string; type: string };
  onSuccess: () => void;
  onCancel: () => void;
}

export default function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    type: user?.type || "user",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        email: form.email,
        type: form.type,
        ...(form.password && { password: form.password }),
      };

      if (user?.id) {
        await userService.update(user.id, payload);
      } else {
        await userService.create({ ...payload, password: form.password });
      }

      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save user.");
    }
  };

  return (
    <Paper elevation={0}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        padding={0}
      >
        <Typography variant="h6">{user ? "Edit User" : "New User"}</Typography>
        <IconButton onClick={onCancel} size="small">
          <CloseIcon />
        </IconButton>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        {[
          {
            label: "Name",
            value: form.name,
            onChange: handleChange("name"),
            type: "text",
            required: true,
          },
          {
            label: "Email",
            value: form.email,
            onChange: handleChange("email"),
            type: "email",
            required: true,
          },
          {
            label: "Password",
            value: form.password,
            onChange: handleChange("password"),
            type: "password",
            required: false,
            placeholder: user ? "Leave blank to keep current password" : "",
          },
        ].map((field, idx) => (
          <TextField
            key={idx}
            label={field.label}
            type={field.type}
            value={field.value}
            onChange={field.onChange}
            required={field.required}
            fullWidth
            margin="normal"
            placeholder={field.placeholder}
          />
        ))}

        <TextField
          select
          label="Kind"
          value={form.type}
          onChange={handleChange("type")}
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </TextField>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 3 }}
        >
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {user ? "Save Changes" : "Create"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
