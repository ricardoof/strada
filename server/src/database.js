// src/database.js
import sqlite3 from 'sqlite3';

// Cria o arquivo 'strada.db' na raiz da pasta server
const db = new sqlite3.Database('./strada.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao SQLite:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Cria as tabelas iniciais (exemplo: tabela de usuarios)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);
});

export default db;