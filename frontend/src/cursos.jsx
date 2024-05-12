// Cursos.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Container, List, ListItem, ListItemText } from "@mui/material";

const Cursos = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const obtenerCursos = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get("http://localhost:3000/cursos", config);
        setCursos(response.data.cursos);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };

    obtenerCursos();
  }, []);

  return (
    <Container sx={{ marginTop: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Listado de Cursos
      </Typography>
      <List>
        {Array.isArray(cursos) &&
          cursos.map((curso) => (
            <ListItem key={curso.id}>
              <ListItemText primary={curso.nombre} secondary={curso.descripcion} />
            </ListItem>
          ))}
      </List>
    </Container>
  );
};

export default Cursos;
