# 🚌 Strada - Sistema de Venda de Passagens de Ônibus

Sistema completo de venda de passagens de ônibus online, desenvolvido com React (Frontend) e Node.js + SQLite (Backend).

## 📸 Capturas de Tela

Veja algumas telas do sistema em funcionamento na pasta [`strada_imgs/`](./strada_imgs/).

## 📋 Funcionalidades

### Para Usuários
- ✅ Cadastro e Login de usuários
- 🔍 Busca de destinos disponíveis
- 🪑 Seleção interativa de assentos
- 💳 Múltiplas formas de pagamento (PIX, Cartão de Crédito/Débito, Boleto)
- ⏱️ Sistema de reserva temporária de assentos (15 minutos)
- 📱 Histórico de viagens compradas
- ❌ Cancelamento de viagens
- 🎓 Desconto especial para estudantes (50%)

### Para Administradores
- ➕ Cadastro de novas viagens/destinos
- 📊 Gestão completa do sistema

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19** - Framework JavaScript
- **Vite** - Build tool
- **React Router** - Navegação
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **html2pdf.js** - Geração de PDFs (boletos)

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **SQLite3** - Banco de dados
- **bcryptjs** - Criptografia de senhas
- **CORS** - Comunicação entre frontend e backend

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **npm** (vem junto com o Node.js)
- **Git** - [Download](https://git-scm.com/)

Para verificar se estão instalados, execute:

```bash
node --version
npm --version
git --version
```

## 🚀 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/ricardoof/strada.git
cd strada
```

### 2. Configurar o Backend (Servidor)

```bash
# Navegar para a pasta do servidor
cd server

# Instalar dependências
npm install

# Iniciar o servidor
npm run dev
```

O servidor estará rodando em: `http://localhost:3333`

**Obs:** O banco de dados SQLite será criado automaticamente na primeira execução.

### 3. Configurar o Frontend (Interface Web)

**Em um novo terminal**, execute:

```bash
# Voltar para a raiz do projeto
cd ..

# Navegar para a pasta web
cd web

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em: `http://localhost:5173`

## 🎯 Como Usar

### Primeira Execução

1. **Acesse o sistema**: Abra `http://localhost:5173` no navegador
2. **Crie uma conta**: Clique em "Criar Conta" e preencha seus dados
3. **Faça login**: Use o email e senha cadastrados
4. **Explore destinos**: Navegue pelos destinos disponíveis
5. **Compre passagens**: Selecione um destino, escolha assentos e finalize a compra

### Conta de Administrador

Para criar uma conta de administrador, você precisa editar o banco de dados diretamente:

1. Crie uma conta normal pelo site
2. Abra o arquivo `server/strada.db` com um editor SQLite
3. Execute:
   ```sql
   UPDATE users SET is_admin = 1 WHERE email = 'seu-email@exemplo.com';
   ```
4. Faça login novamente para ver o painel administrativo

### Desconto de Estudante

1. Acesse sua área de usuário
2. Solicite o benefício de estudante
3. Após aprovação, você terá 50% de desconto em todas as compras

## 📂 Estrutura do Projeto

```
strada/
├── server/                 # Backend
│   ├── src/
│   │   ├── server.js      # Servidor Express e rotas
│   │   └── database.js    # Configuração do SQLite
│   ├── package.json
│   └── strada.db          # Banco de dados (criado automaticamente)
│
├── web/                    # Frontend
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── contexts/      # Context API (autenticação)
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── layouts/       # Layouts
│   │   ├── App.jsx        # Componente principal
│   │   └── main.jsx       # Ponto de entrada
│   ├── public/            # Arquivos estáticos
│   └── package.json
│
└── strada_imgs/            # Capturas de tela do sistema
```

## 🔧 Scripts Disponíveis

### Backend (pasta `server/`)

```bash
npm run dev      # Inicia o servidor em modo desenvolvimento (com auto-reload)
npm start        # Inicia o servidor em modo produção
```

### Frontend (pasta `web/`)

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Visualiza o build de produção
npm run lint     # Verifica erros de código
```

## 🌐 Acessando de Outros Dispositivos

O Vite já está configurado para aceitar conexões de outros dispositivos na rede local.

1. Inicie o frontend com `npm run dev`
2. O terminal mostrará um endereço de rede, por exemplo:
   ```
   Network: http://192.168.1.100:5173
   ```
3. Use esse endereço em outros dispositivos conectados à mesma rede Wi-Fi

## 🐛 Solução de Problemas

### Erro: "Port 3333 already in use"
O servidor backend já está rodando. Feche-o e tente novamente, ou mude a porta no arquivo `server/src/server.js`.

### Erro: "Port 5173 already in use"
O frontend já está rodando. Feche-o e tente novamente.

### Erro de CORS
Certifique-se de que o servidor backend está rodando antes de iniciar o frontend.

### Banco de dados não é criado
Verifique as permissões de escrita na pasta `server/`.

### Dependências não instaladas
Delete as pastas `node_modules` e o arquivo `package-lock.json`, depois execute `npm install` novamente.

## 📝 Variáveis de Ambiente

O projeto usa URLs fixas (`http://localhost:3333` e `http://localhost:5173`). Para produção, você precisará:

1. Criar arquivos `.env` em cada pasta
2. Configurar as URLs de produção
3. Substituir `http://localhost:3333` por variáveis de ambiente no código

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨‍💻 Autores

- **Ricardo** - [GitHub](https://github.com/ricardoof)
- **Leanderson** - [GitHub](https://github.com/Leandersonleles21)

## 🙏 Agradecimentos

Desenvolvido como projeto acadêmico para a disciplina INF 321.

---

**Nota:** Este é um projeto educacional. Para uso em produção, implemente medidas adicionais de segurança, validação e testes.
