const express = require('express');
const path = require('path');
const app = express();

// Ajuste aqui: build está na raiz do projeto
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor rodando...');
});
