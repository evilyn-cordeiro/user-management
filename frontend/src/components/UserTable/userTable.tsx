import {
  Box,
  Button,
  Paper,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface User {
  id: number;
  name: string;
  email: string;
  type: string;
}

interface UserTableProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserTable({
  users,
  loading,
  onEdit,
  onDelete,
}: UserTableProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "type", headerName: "Kind", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <Box display="flex" gap={1} alignItems="center" justifyContent="center">
          <Button
            onClick={() => onEdit(params.row)}
            startIcon={<EditIcon />}
            variant="outlined"
            size="small"
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete(params.row.id)}
            color="error"
            startIcon={<DeleteIcon />}
            variant="outlined"
            size="small"
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  if (loading) {
    return (
      <Paper sx={{ height: 500, width: "100%", overflow: "auto" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  if (isMobile) {
    return (
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid key={user.id}>
            <Card>
              <CardHeader
                avatar={<Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>}
                title={user.name}
                subheader={user.email}
                action={
                  <Box>
                    <IconButton onClick={() => onEdit(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDelete(user.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                }
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Role: {user.type}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Paper sx={{ height: 500, width: "100%", overflow: "auto" }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            background: "black",
            fontWeight: "bold",
            fontSize: "0.95rem",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      />
    </Paper>
  );
}
