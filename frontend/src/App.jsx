import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Cursos from "./cursos";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Ruta para la página de inicio de sesión */}
        <Route path="/login" element={<Login />} />
        <Route path="/cursos" element={<Cursos />} />
      </Routes>
    </Router>
  );
};

export default App;
