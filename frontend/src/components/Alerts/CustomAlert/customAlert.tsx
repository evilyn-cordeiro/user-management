import { Alert, AlertProps } from "@mui/material";

export default function CustomAlert(props: AlertProps) {
  return <Alert sx={{ mb: 2 }} {...props} />;
}
