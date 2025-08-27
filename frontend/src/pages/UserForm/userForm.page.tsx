import { useState, useEffect } from "react";
import { TextField, Button, Box, MenuItem, Paper, Typography, Alert } from "@mui/material";
import { userService } from "../../services/users.service";

interface UserFormProps {
  user?: { id?: number; name: string; email: string; type: string };
  onSuccess: () => void;
}

export default function UserForm({ user, onSuccess }: UserFormProps) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [type, setType] = useState(user?.type || "user");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user?.id) {
        await userService.update(user.id, { name, email, type, password: password || undefined });
      } else {
        await userService.create({ name, email, type, password });
      }
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao salvar usuário");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" mb={2}>
        {user ? "Editar Usuário" : "Novo Usuário"}
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Tipo"
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          {user ? "Salvar Alterações" : "Criar Usuário"}
        </Button>
      </Box>
    </Paper>
  );
}
