import { TextField, TextFieldProps } from "@mui/material";

export default function CustomTextField(props: TextFieldProps) {
  return <TextField fullWidth margin="normal" {...props} size="medium" />;
}
