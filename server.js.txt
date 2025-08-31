// server.js
const express = require("express");
const path = require("path");
const app = express();

// Porta fornecida pelo Render ou 3000 localmente
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Rota de teste
app.get("/api", (req, res) => {
  res.json({ message: "Servidor rodando no Render 🚀" });
});

// Se você tiver um build do React (frontend)
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});