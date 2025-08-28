import { TextField, TextFieldProps } from "@mui/material";

export default function CustomTextField(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      fullWidth
      margin="normal"
      size="medium"
      autoComplete="false"
    />
  );
}
