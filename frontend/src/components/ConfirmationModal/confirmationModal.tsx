import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmationModalProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  open,
  message,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">Confirmação</DialogTitle>
      <DialogContent>
        <Typography id="confirmation-dialog-description">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="error">
          Não
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}
