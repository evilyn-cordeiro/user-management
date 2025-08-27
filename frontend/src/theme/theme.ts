import { createTheme, alpha } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#F5F6FA",
      paper: "#FFFFFF",
    },
    primary: {
      main: "#050A24",
    },
    secondary: {
      main: "#9c27b0",
    },
    text: {
      primary: "#1D1D1F",
      secondary: "#65636D",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h1: { textTransform: "none" },
    h2: { textTransform: "none" },
    h3: { textTransform: "none" },
    h4: { textTransform: "none" },
    h5: { textTransform: "none", fontWeight: 600, color: "#101828" },
    h6: { textTransform: "none" },
    body1: { textTransform: "none" },
    body2: { textTransform: "none" },
    button: { textTransform: "none" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: "#4379EE",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: alpha("#1570EF", 0.85),
          },
          "&:disabled": {
            backgroundColor: "#A6C8FF",
            color: "rgba(255,255,255,0.7)",
          },
        },
        outlinedPrimary: {
          borderColor: "#1570EF",
          color: "#1570EF",
          "&:hover": {
            backgroundColor: alpha("#1570EF", 0.08),
          },
          "&:disabled": {
            borderColor: "#D0D0D0",
            color: "#A6C8FF",
          },
        },
      },
    },
  },
});

export default theme;
