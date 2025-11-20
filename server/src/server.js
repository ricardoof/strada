// src/server.js
import express from 'express';
import cors from 'cors';
import db from './database.js';

const app = express();
const PORT = 3333; // Porta do servidor (diferente do Vite que é 5173)

// Middlewares
app.use(express.json()); // Para o servidor entender JSON
app.use(cors()); // Libera o acesso do Frontend

// --- ROTAS ---

// Rota de Teste
app.get('/', (req, res) => {
  res.json({ message: 'Servidor Strada rodando!' });
});

// Exemplo: Listar usuários do banco
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ users: rows });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});