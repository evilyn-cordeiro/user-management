import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import axios from "axios";
import {
  CustomAlert,
  CustomButton,
  CustomCard,
  CustomPasswordTextField,
  CustomTextField,
  Logo,
} from "../../components";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<{ token: string }>(
        "http://localhost:3000/auth/login",
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/users");
    } catch {
      setError("Credenciais inválidas");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        backgroundImage: `url('/images/background-circular.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#050A24",
        padding: "1rem",
      }}
    >
      <Box
        position="absolute"
        top={25}
        left={isMobile ? "50%" : 25}
        sx={{
          transform: isMobile ? "translateX(-50%)" : "none",
          zIndex: 1,
        }}
      >
        <Logo />
      </Box>

      <CustomCard
        style={{
          borderRadius: 20,
        }}
      >
        <Typography variant="h5" component="h1" mb={2} textAlign="center">
          Login to your account
        </Typography>

        {error && <CustomAlert severity="error">{error}</CustomAlert>}

        <form onSubmit={handleSubmit}>
          <CustomTextField
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="false"
          />
          <CustomPasswordTextField
            label="Password"
            type="password"
            aria-label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box marginTop={2}>
            <CustomButton
              type="submit"
              style={{
                backgroundColor: "#4379EE",
                borderRadius: "8px",
                height: "52px",
                fontWeight: 600,
              }}
            >
              Login now
            </CustomButton>
            <Typography
              variant="body2"
              mt={3}
              textAlign="center"
              sx={{ cursor: "pointer", color: "#98A2B3" }}
            >
              Don't have an account ?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  margin: 0,
                  color: "#1570EF",
                  fontStyle: "italic",
                  textDecoration: "none",
                  cursor: "pointer",
                  font: "inherit",
                }}
              >
                Sign up
              </button>
            </Typography>
          </Box>
        </form>
      </CustomCard>

      <Box position="absolute" bottom={16} textAlign="center" width="100%">
        <Typography variant="body2" color="#B5B2BC">
          © {new Date().getFullYear()} All rights reserved to SPS Group
        </Typography>
      </Box>
    </Box>
  );
}
