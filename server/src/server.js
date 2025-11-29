// src/server.js
import express from 'express';
import cors from 'cors';
import db from './database.js';
import bcrypt from 'bcryptjs'; // <--- IMPORTANTE

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

// ROTA: Buscar destinos com FILTROS
app.get('/destinos', (req, res) => {
  const { origem, destino, maxPreco, _page, _limit } = req.query;

  // Definições de paginação
  const limit = parseInt(_limit) || 50; // Padrão 50
  const page = parseInt(_page) || 1;    // Padrão página 1
  const offset = (page - 1) * limit;    // Cálculo de quantos pular

  let sql = 'SELECT * FROM destinos WHERE 1=1';
  const params = [];

  // --- FILTROS (Mantém igual) ---
  if (origem) {
    sql += ' AND origem LIKE ?';
    params.push(`%${origem}%`);
  }
  if (destino) {
    sql += ' AND destino LIKE ?';
    params.push(`%${destino}%`);
  }
  if (maxPreco) {
    sql += ' AND preco <= ?';
    params.push(maxPreco);
  }

  // --- ADICIONA O LIMIT E OFFSET NO FINAL ---
  sql += ' LIMIT ? OFFSET ?';
  params.push(limit, offset);

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body; // <-- Removemos is_student daqui

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
    }

    try {
        const userExists = await new Promise((resolve, reject) => {
            db.get("SELECT id FROM users WHERE email = ?", [email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (userExists) {
            return res.status(409).json({ error: "Este e-mail já está cadastrado." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // MUDANÇA: Query SQL simplificada (sem is_student)
        const sql = `
            INSERT INTO users (name, email, password) 
            VALUES (?, ?, ?)
        `;
        
        db.run(sql, [name, email, hashedPassword], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            res.status(201).json({ 
                message: "Usuário criado com sucesso!",
                userId: this.lastID 
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
// ROTA DE LOGIN
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }

    try {
        // 1. Buscar o usuário pelo email
        const user = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        // Se não achou usuário com esse email
        if (!user) {
            return res.status(401).json({ error: "E-mail ou senha incorretos." });
        }

        // 2. Comparar a senha digitada com o HASH do banco
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "E-mail ou senha incorretos." });
        }

        // 3. Buscar as viagens do usuário para retornar junto
        const trips = await new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    up.viagem_id,
                    up.assento,
                    up.status,
                    up.data_compra,
                    v.data_saida,
                    d.origem,
                    d.destino,
                    d.preco
                FROM user_passagens up
                JOIN viagens v ON up.viagem_id = v.id
                JOIN destinos d ON v.destino_id = d.id
                WHERE up.user_id = ?
                ORDER BY up.data_compra DESC
            `;
            db.all(sql, [user.id], (err, rows) => {
                if (err) reject(err);
                
                // Agrupar passagens por viagem e data de compra (aproximada) para reconstruir o formato do frontend
                const groupedTrips = {};
                
                rows.forEach(row => {
                    // Chave única para agrupar: ID da viagem + Data Compra (até os minutos para tolerância)
                    const key = `${row.viagem_id}-${new Date(row.data_compra).getTime()}`;
                    
                    if (!groupedTrips[key]) {
                        groupedTrips[key] = {
                            viagem_id: row.viagem_id,
                            date: row.data_compra,
                            status: row.status,
                            assentos: [],
                            viagem_detalhes: {
                                origem: row.origem,
                                destino: row.destino,
                                data_saida: row.data_saida
                            },
                            valores: {
                                total: 0 // Vamos somar
                            }
                        };
                    }
                    
                    groupedTrips[key].assentos.push(row.assento);
                    groupedTrips[key].valores.total += row.preco;
                });

                resolve(Object.values(groupedTrips));
            });
        });

        // 4. Sucesso! Retornar dados do usuário (sem a senha) e suas viagens
        res.json({
            message: "Login realizado com sucesso!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                is_student: user.is_student,
                is_admin: user.is_admin,
                trips: trips // <--- Agora enviamos o histórico real do banco
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
app.get('/viagens/:id/assentos', (req, res) => {
    const viagemId = req.params.id;
    // Busca assentos ocupados OU reservados recentemente (menos de 15 min)
    const sql = `
        SELECT assento FROM user_passagens 
        WHERE viagem_id = ? 
        AND (
            status IN ('confirmado', 'pago', 'aguardando pagamento')
            OR (status = 'reservado' AND datetime(data_compra, '+15 minutes') > datetime('now'))
        )
    `;
    db.all(sql, [viagemId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const ocupados = rows.map(r => r.assento);
        res.json(ocupados);
    });
});

// ROTA: Reservar Assentos (Temporário)
app.post('/reservar', async (req, res) => {
    const { viagem_id, assentos, dados_usuario, dados_passageiro } = req.body;

    try {
        // 1. Verifica disponibilidade
        const placeholders = assentos.map(() => '?').join(',');
        const checkSql = `
            SELECT assento FROM user_passagens 
            WHERE viagem_id = ? 
            AND assento IN (${placeholders})
            AND (
                status IN ('confirmado', 'pago', 'aguardando pagamento')
                OR (status = 'reservado' AND datetime(data_compra, '+15 minutes') > datetime('now'))
            )
        `;
        
        const checkParams = [viagem_id, ...assentos];
        const assentosOcupados = await new Promise((resolve, reject) => {
            db.all(checkSql, checkParams, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });

        if (assentosOcupados.length > 0) {
            const lista = assentosOcupados.map(r => r.assento).join(', ');
            return res.status(409).json({ 
                error: "ASSENTO_INDISPONIVEL",
                message: `O(s) assento(s) ${lista} não estão mais disponíveis.`
            });
        }

        // 2. Cria/Busca Usuário
        let userId;
        const existingUser = await new Promise((resolve, reject) => {
            db.get("SELECT id FROM users WHERE email = ?", [dados_usuario.email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (existingUser) {
            userId = existingUser.id;
        } else {
            const tempPassword = await bcrypt.hash("mudar123", 10);
            userId = await new Promise((resolve, reject) => {
                db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, 
                    [dados_usuario.nome, dados_usuario.email, tempPassword], 
                    function(err) {
                        if (err) reject(err);
                        resolve(this.lastID);
                    }
                );
            });
            db.run(`INSERT INTO user_dados (user_id, cpf, telefone) VALUES (?, ?, ?)`,
                [userId, dados_usuario.cpf, dados_usuario.telefone]
            );
        }

        // 3. Insere como 'reservado'
        const stmt = db.prepare(`INSERT INTO user_passagens (user_id, viagem_id, assento, nome_passageiro, status) VALUES (?, ?, ?, ?, 'reservado')`);
        assentos.forEach(assento => {
            stmt.run(userId, viagem_id, assento, dados_passageiro.nome);
        });
        stmt.finalize();

        // Retorna sucesso e o tempo de expiração (15 min a partir de agora)
        // Nota: O servidor pode ter hora diferente do cliente, mas vamos mandar o timestamp relativo ou absoluto
        res.json({ 
            message: "Reservado com sucesso!", 
            userId: userId,
            expiresIn: 15 * 60 * 1000 // 15 minutos em ms
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao reservar assentos." });
    }
});

// ROTA: Checkout Inteligente
app.post('/checkout', async (req, res) => {
    const { viagem_id, assentos, dados_usuario, dados_passageiro } = req.body;

    try {
        // 1. Busca Usuário
        let userId;
        const existingUser = await new Promise((resolve, reject) => {
            db.get("SELECT id FROM users WHERE email = ?", [dados_usuario.email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (!existingUser) {
             // Se não achou usuário (estranho se veio do reservar, mas possível se pulou etapas ou expirou muito tempo)
             // Cria usuário... (código duplicado, ideal seria refatorar, mas vamos manter simples)
             const tempPassword = await bcrypt.hash("mudar123", 10);
             userId = await new Promise((resolve, reject) => {
                 db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, 
                     [dados_usuario.nome, dados_usuario.email, tempPassword], 
                     function(err) {
                         if (err) reject(err);
                         resolve(this.lastID);
                     }
                 );
             });
             db.run(`INSERT INTO user_dados (user_id, cpf, telefone) VALUES (?, ?, ?)`,
                 [userId, dados_usuario.cpf, dados_usuario.telefone]
             );
        } else {
            userId = existingUser.id;
        }

        // 2. Tenta ATUALIZAR a reserva existente
        // Verifica se existe reserva válida para este usuário e assentos
        const placeholders = assentos.map(() => '?').join(',');
        const updateSql = `
            UPDATE user_passagens 
            SET status = 'confirmado', data_compra = CURRENT_TIMESTAMP
            WHERE user_id = ? 
            AND viagem_id = ? 
            AND assento IN (${placeholders})
            AND status = 'reservado'
        `;
        
        const updateParams = [userId, viagem_id, ...assentos];
        
        const result = await new Promise((resolve, reject) => {
            db.run(updateSql, updateParams, function(err) {
                if (err) reject(err);
                resolve(this);
            });
        });

        // Se atualizou o mesmo número de assentos, sucesso!
        if (result.changes === assentos.length) {
             return res.json({ message: "Compra confirmada (reserva atualizada)!", userId: userId });
        }

        // Se não atualizou tudo (talvez não tivesse reserva, ou expirou e foi limpo, ou status já era outro)
        // Vamos tentar INSERIR (caso não exista)
        // Mas antes, verifica disponibilidade de novo (pode ter expirado e outro pego)
        
        // ... (Lógica de verificação de disponibilidade igual ao /reservar) ...
        // Para simplificar, vamos assumir que se não atualizou, tentamos inserir como novo.
        // Se falhar por constraint ou verificação, retorna erro.

        // Check availability again
        const checkSql = `
            SELECT assento FROM user_passagens 
            WHERE viagem_id = ? AND assento IN (${placeholders})
            AND (
                status IN ('confirmado', 'pago', 'aguardando pagamento')
                OR (status = 'reservado' AND datetime(data_compra, '+15 minutes') > datetime('now'))
            )
        `;
        const checkParams = [viagem_id, ...assentos];
        const assentosOcupados = await new Promise((resolve, reject) => {
            db.all(checkSql, checkParams, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });

        if (assentosOcupados.length > 0) {
             // Se já está ocupado (e não era nossa reserva, pois o update falhou), erro.
             // Mas espere, se o update falhou, pode ser que já estivesse 'confirmado' (idempotência).
             // Vamos verificar se já é nosso e confirmado.
             const meusAssentos = await new Promise((resolve, reject) => {
                 db.all(`SELECT assento FROM user_passagens WHERE user_id = ? AND viagem_id = ? AND assento IN (${placeholders})`, 
                 [userId, viagem_id, ...assentos], (err, rows) => {
                     if (err) reject(err);
                     resolve(rows);
                 });
             });
             
             if (meusAssentos.length === assentos.length) {
                 return res.json({ message: "Compra já estava confirmada!", userId: userId });
             }

             return res.status(409).json({ error: "Assentos não disponíveis ou reserva expirada." });
        }

        // Se chegou aqui, está livre. Insere.
        const stmt = db.prepare(`INSERT INTO user_passagens (user_id, viagem_id, assento, nome_passageiro, status) VALUES (?, ?, ?, ?, 'confirmado')`);
        assentos.forEach(assento => {
            stmt.run(userId, viagem_id, assento, dados_passageiro.nome);
        });
        stmt.finalize();

        res.json({ message: "Compra realizada!", userId: userId });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no processamento da compra" });
    }
});

// ROTA: Checkout Inteligente
app.post('/checkout', async (req, res) => {
    const { viagem_id, assentos, dados_usuario, dados_passageiro } = req.body;
    // dados_usuario = { nome, email, telefone, cpf }
    // assentos = [12, 13] (pode ser mais de um)

    try {
        let userId;

        // 1. Verifica se usuário já existe pelo email
        const existingUser = await new Promise((resolve, reject) => {
            db.get("SELECT id FROM users WHERE email = ?", [dados_usuario.email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (existingUser) {
            userId = existingUser.id;
        } else {
            // 2. Se não existe, cria conta AUTOMÁTICA
            // Geramos uma senha padrão temporária (na vida real, enviaria por email)
            const tempPassword = await bcrypt.hash("mudar123", 10);
            
            userId = await new Promise((resolve, reject) => {
                db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, 
                    [dados_usuario.nome, dados_usuario.email, tempPassword], 
                    function(err) {
                        if (err) reject(err);
                        resolve(this.lastID);
                    }
                );
            });

            // 3. Salva dados extras (CPF/Telefone) em user_dados
            db.run(`INSERT INTO user_dados (user_id, cpf, telefone) VALUES (?, ?, ?)`,
                [userId, dados_usuario.cpf, dados_usuario.telefone]
            );
        }

        // 4. Cria as passagens (Loop pelos assentos)
        const stmt = db.prepare(`INSERT INTO user_passagens (user_id, viagem_id, assento, nome_passageiro) VALUES (?, ?, ?, ?)`);
        
        assentos.forEach(assento => {
            stmt.run(userId, viagem_id, assento, dados_passageiro.nome);
        });
        stmt.finalize();

        res.json({ message: "Compra realizada!", userId: userId, newAccount: !existingUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no processamento da compra" });
    }
});

// ROTA: Cadastrar Novo Destino (Admin)
app.post('/destinos', (req, res) => {
    const { origem, destino, preco, data_saida, local_saida, local_chegada, imagem } = req.body;

    if (!origem || !destino || !preco || !data_saida) {
        return res.status(400).json({ error: "Preencha os campos obrigatórios." });
    }

    const sql = `
        INSERT INTO destinos (origem, destino, preco, data_saida, local_saida, local_chegada, imagem)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [origem, destino, preco, data_saida, local_saida, local_chegada, imagem];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        // Opcional: Criar entrada na tabela 'viagens' para manter consistência se necessário futuramente
        // db.run('INSERT INTO viagens (destino_id, data_saida) VALUES (?, ?)', [this.lastID, data_saida]);

        res.status(201).json({ message: "Viagem cadastrada com sucesso!", id: this.lastID });
    });
});

// ROTA: Cancelar Viagem
app.post('/cancelar-viagem', async (req, res) => {
    const { userId, viagemId, assentos } = req.body;

    if (!userId || !viagemId || !assentos || assentos.length === 0) {
        return res.status(400).json({ error: "Dados inválidos para cancelamento." });
    }

    try {
        const placeholders = assentos.map(() => '?').join(',');
        const sql = `
            UPDATE user_passagens 
            SET status = 'cancelado' 
            WHERE user_id = ? 
            AND viagem_id = ? 
            AND assento IN (${placeholders})
        `;

        const params = [userId, viagemId, ...assentos];

        await new Promise((resolve, reject) => {
            db.run(sql, params, function(err) {
                if (err) reject(err);
                resolve(this);
            });
        });

        res.json({ message: "Viagem cancelada com sucesso!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao cancelar viagem." });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
app.post('/checkout', async (req, res) => {
    const { viagem_id, assentos, dados_usuario, dados_passageiro } = req.body;

    try {
        // --- 1. VERIFICAÇÃO DE SEGURANÇA (CONCORRÊNCIA) ---
        // Antes de criar qualquer coisa, verificamos se os assentos AINDA estão livres.
        // Se alguém comprou 1 milissegundo antes, esta query vai achar o assento.
        
        const placeholders = assentos.map(() => '?').join(',');
        const checkSql = `
            SELECT assento FROM user_passagens 
            WHERE viagem_id = ? AND assento IN (${placeholders})
        `;
        
        // Precisamos dos parametros: o ID da viagem + a lista de assentos
        const checkParams = [viagem_id, ...assentos];

        const assentosOcupados = await new Promise((resolve, reject) => {
            db.all(checkSql, checkParams, (err, rows) => {
                if (err) reject(err);
                resolve(rows); // Retorna array de objetos [{assento: 1}, {assento: 2}]
            });
        });

        if (assentosOcupados.length > 0) {
            // Opa! Alguém já comprou um desses assentos
            const lista = assentosOcupados.map(r => r.assento).join(', ');
            return res.status(409).json({ // 409 = Conflict
                error: "ASSENTO_INDISPONIVEL",
                message: `O(s) assento(s) ${lista} já foram reservados por outra pessoa agora pouco. Por favor, escolha outro.`
            });
        }

        // --- 2. Lógica de Usuário (Igual ao seu código anterior) ---
        let userId;
        const existingUser = await new Promise((resolve, reject) => {
            db.get("SELECT id FROM users WHERE email = ?", [dados_usuario.email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (existingUser) {
            userId = existingUser.id;
        } else {
            const tempPassword = await bcrypt.hash("mudar123", 10);
            userId = await new Promise((resolve, reject) => {
                db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, 
                    [dados_usuario.nome, dados_usuario.email, tempPassword], 
                    function(err) {
                        if (err) reject(err);
                        resolve(this.lastID);
                    }
                );
            });
            db.run(`INSERT INTO user_dados (user_id, cpf, telefone) VALUES (?, ?, ?)`,
                [userId, dados_usuario.cpf, dados_usuario.telefone]
            );
        }

        // --- 3. Inserção das Passagens ---
        const stmt = db.prepare(`INSERT INTO user_passagens (user_id, viagem_id, assento, nome_passageiro) VALUES (?, ?, ?, ?)`);
        assentos.forEach(assento => {
            stmt.run(userId, viagem_id, assento, dados_passageiro.nome);
        });
        stmt.finalize();

        res.json({ message: "Compra realizada!", userId: userId, newAccount: !existingUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no processamento da compra" });
    }
});
app.get('/viagens/:id', (req, res) => {
    const id = req.params.id;
    
    db.get('SELECT * FROM destinos WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (row) {
            res.json(row);
        } else {
            // Se não achar, retorna 404. Assim você sabe que o ID está errado no front.
            res.status(404).json({ error: "Viagem não encontrada no banco de dados." });
        }
    });
});
// ROTA: Solicitar benefício de estudante (Atualiza o status no banco)
app.post('/request-student', (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "ID do usuário é obrigatório." });
    }

    // Atualiza a flag is_student para 1 (true)
    const sql = `UPDATE users SET is_student = 1 WHERE id = ?`;

    db.run(sql, [userId], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        // Verifica se atualizou alguma linha (se o usuário existe)
        if (this.changes === 0) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        res.json({ message: "Benefício de estudante ativado com sucesso!" });
    });
});