// app.js
const express = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Cursos",
      version: "1.0.0",
      description: "API para la gestión de cursos",
    },
  },
  apis: ["app.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Configurar conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: "192.168.1.96",
  user: "lgomez",
  password: "MySQL2024*",
  database: "segundo_parcial",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos MySQL");
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica al usuario y devuelve un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT generado
 *       401:
 *         description: Credenciales inválidas
 */
// Endpoint de inicio de sesión
app.post("/login", (req, res) => {
  console.log("Solicitud recibida:", req.body);
  // Lógica de autenticación y generación de token JWT
  const username = req.body.username;
  const password = req.body.password;

  // Simplemente para ejemplo, aquí deberías validar el usuario y contraseña con tu base de datos
  if (username === "usuario" && password === "contraseña") {
    const token = jwt.sign({ username }, "secreto");
    res.json({ token });
  } else {
    res.status(401).json({ error: "Credenciales inválidas" });
  }
});

/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Obtener cursos
 *     description: Devuelve la lista de cursos disponibles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cursos
 *       401:
 *         description: Token inválido o no proporcionado
 *       403:
 *         description: Acceso prohibido
 */
// Endpoint para obtener cursos (requiere autenticación)
app.get("/cursos", verifyToken, (req, res) => {
  // Simplemente para ejemplo, aquí obtendrías los cursos del usuario autenticado desde tu base de datos
  res.json({ cursos: ["Curso 1", "Curso 2", "Curso 3"] });
});

// Middleware para verificar token JWT
function verifyToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(403).json({ error: "Token no proporcionado" });
  }

  const [bearer, token] = authorizationHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ error: "Token inválido" });
  }

  jwt.verify(token, "secreto", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }
    req.username = decoded.username;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
