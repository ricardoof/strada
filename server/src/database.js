import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./strada.db', (err) => {
  if (err) console.error('Erro:', err.message);
  else console.log('Banco conectado.');
});

db.serialize(() => {
  // 1. Usuários
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    is_student BOOLEAN DEFAULT 0,
    is_admin BOOLEAN DEFAULT 0
  )`);

  // 2. Dados Pessoais do Usuário (CPF, Telefone, etc)
  db.run(`CREATE TABLE IF NOT EXISTS user_dados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    cpf TEXT,
    telefone TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  // 3. Destinos
  db.run(`CREATE TABLE IF NOT EXISTS destinos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
                origem TEXT,
                destino TEXT,
                preco REAL,
                data_saida TEXT,
                local_saida TEXT,
                local_chegada TEXT,
                imagem TEXT
  )`);
  // 4. Viagens (Instância do destino com data)
  db.run(`CREATE TABLE IF NOT EXISTS viagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    destino_id INTEGER,
    data_saida DATETIME,
    bus_tipo TEXT,
    FOREIGN KEY(destino_id) REFERENCES destinos(id)
  )`);

  // 5. Passagens Compradas (Histórico + Assento Ocupado)
  // Substitui a antiga tabela 'reservas' para ficar como você pediu
  db.run(`CREATE TABLE IF NOT EXISTS user_passagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    viagem_id INTEGER,
    assento INTEGER,
    nome_passageiro TEXT,
    status TEXT DEFAULT 'confirmado',
    data_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(viagem_id) REFERENCES viagens(id)
  )`);
});

export default db;