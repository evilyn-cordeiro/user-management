import { Paper, PaperProps } from "@mui/material";

export default function CustomCard(props: PaperProps) {
  return <Paper elevation={8} sx={{ p: 4, maxWidth: 500, maxHeight: 450 }} {...props} />;
}
