import { Box, Button, TextField, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

export default function PageToolbar({
  count,
  filterType, onChangeType,
  onAddNew,
  onSearch, searchValue,
}:{
  count: number;
  filterType: string; onChangeType: (v:string)=>void;
  onAddNew: ()=>void;
  onSearch: (v:string)=>void;
  searchValue: string;
}) {
  return (
    <Box sx={{ display:"flex", alignItems:"center", gap:2, flexWrap:"wrap" }}>
      <TextField
        select value={filterType} onChange={e=>onChangeType(e.target.value)}
        size="small" sx={{ minWidth: 140 }}
        label={`All (${count})`}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="user">User</MenuItem>
      </TextField>

      <Button variant="contained" startIcon={<AddIcon />} onClick={onAddNew}>
        Add New
      </Button>

      <Box sx={{ ml: "auto", display:"flex", alignItems:"center", gap:1 }}>
        <SearchIcon />
        <TextField
          size="small"
          placeholder="Search..."
          value={searchValue}
          onChange={(e)=>onSearch(e.target.value)}
        />
      </Box>
    </Box>
  );
}
