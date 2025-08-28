import {
  Box,
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
  Pagination,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [pageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const totalEntries = users.length;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalEntries);
  const paginatedUsers = users.slice((page - 1) * pageSize, page * pageSize);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Avatar",
      flex: 0.3,
      minWidth: 70,
      sortable: false,
      renderCell: (params) => (
        <Box padding={0.5}>
          <Avatar sx={{ width: 40, height: 40 }}>
            {params.row.name?.charAt(0).toUpperCase()}
          </Avatar>
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "E-mail",
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: "type",
      headerName: "Kind",
      flex: 0.8,
      sortable: false,
      minWidth: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 180,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => {
        const open = Boolean(anchorEl);

        const handleClick = (
          event: React.MouseEvent<HTMLElement>,
          user: User
        ) => {
          setAnchorEl(event.currentTarget);
          setSelectedUser(user);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };

        return (
          <Box>
            <IconButton onClick={(event) => handleClick(event, params.row)}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem
                onClick={() => {
                  onEdit(selectedUser!);
                  handleClose();
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDelete(params.row.id);
                  handleClose();
                }}
                sx={{ color: "error.main" }}
              >
                Delete
              </MenuItem>
            </Menu>
          </Box>
        );
      },
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
      <Grid container spacing={2} marginTop={3}>
        {users.map((user) => (
          <Grid key={user.id} width={"100%"}>
            <Card>
              <CardHeader
                avatar={<Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>}
                title={user.name}
                subheader={user.email}
                action={
                  <>
                    <IconButton
                      onClick={(event) => setAnchorEl(event.currentTarget)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                    >
                      <MenuItem
                        onClick={() => {
                          onEdit(user);
                          setAnchorEl(null);
                        }}
                      >
                        Editar
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          onDelete(user.id);
                          setAnchorEl(null);
                        }}
                        sx={{ color: "error.main" }}
                      >
                        Deletar
                      </MenuItem>
                    </Menu>
                  </>
                }
              />

              <CardContent>
                <Typography variant="body2" sx={{ color: "#233EAE" }}>
                  Role: {user.type}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Box
          component="footer"
          sx={{
            position: "sticky",
            bottom: 0,
            width: "100%",
            bgcolor: "#f1f1f1",
            padding: "15px",
            textAlign: "center",
            borderTop: "1px solid #ccc",
          }}
        >
          <Stack
            alignItems="center"
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography variant="body2" color="#1570EF">
              Showing {start} to {end} of {totalEntries} entries
            </Typography>

            <Pagination
              count={Math.ceil(totalEntries / pageSize)}
              page={page}
              onChange={(event, value) => setPage(value)}
              sx={{
                marginRight: "1rem",
                "& .MuiPaginationItem-root": {
                  color: "blue",
                  borderRadius: 0,
                  minWidth: "30px",
                  height: "30px",
                },
                "& .Mui-selected": {
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "darkred",
                  },
                },
              }}
            />
          </Stack>
        </Box>
      </Grid>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Paper
        sx={{
          height: "100vh",
          width: "100%",
          overflow: "auto",
        }}
      >
        <DataGrid
          rows={paginatedUsers}
          columns={columns}
          rowCount={users.length}
          paginationMode="server"
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          hideFooter
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              background: "black",
              color: "#343A40",
              fontSize: "0.95rem",
            },
            "& .MuiDataGrid-row": {
              color: "#1570EF",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        />
      </Paper>
      <Box
        component="footer"
        sx={{
          position: "sticky",
          bottom: 0,
          bgcolor: "#f1f1f1",
          padding: "15px",
          textAlign: "center",
          borderTop: "1px solid #ccc",
        }}
      >
        <Stack
          alignItems="center"
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="body2" color="#1570EF">
            Showing {start} to {end} of {totalEntries} entries
          </Typography>

          <Pagination
            count={Math.ceil(totalEntries / pageSize)}
            page={page}
            onChange={(event, value) => setPage(value)}
            sx={{
              marginRight: "1rem",
              "& .MuiPaginationItem-root": {
                color: "blue",
                borderRadius: 0,
                minWidth: "30px",
                height: "30px",
              },
              "& .Mui-selected": {
                backgroundColor: "red",
                color: "white",
                "&:hover": {
                  backgroundColor: "darkred",
                },
              },
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}
