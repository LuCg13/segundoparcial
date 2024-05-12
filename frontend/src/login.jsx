// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Typography, Container, Grid } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", { username, password });
      localStorage.setItem("token", response.data.token);
      navigate("/cursos");
    } catch (error) {
      console.error("Error de inicio de sesión:", error.response.data.error);
      alert("Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 8 }}>
      <div>
        <Typography variant="h4">Iniciar Sesión</Typography>
        <form onSubmit={handleLogin}>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12}>
              <TextField variant="outlined" fullWidth label="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
