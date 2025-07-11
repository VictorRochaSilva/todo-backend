# 📝 To-Do List API

Uma API RESTful para gerenciamento de tarefas, desenvolvida com **Node.js**, **Express** e **Mongoose**, utilizando **MongoDB** em container Docker para persistência de dados.

---

## 📚 Índice

- [🛠 Tecnologias](#-tecnologias)
- [📋 Pré-requisitos](#-pré-requisitos)
- [⚙ Configuração do Ambiente](#-configuração-do-ambiente)
- [🚀 Execução do Projeto](#-execução-do-projeto)
- [🔐 Variáveis de Ambiente](#-variáveis-de-ambiente)
- [🌐 Rotas da API](#-rotas-da-api)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🧪 Testes](#-testes)
- [🤝 Contribuição](#-contribuição)
- [🎯 Status do Projeto](#-status-do-projeto)

---

## 🛠 Tecnologias

| Backend     | Banco de Dados | Ferramentas                |
|-------------|----------------|----------------------------|
| Node.js     | MongoDB (Docker) | Docker / Docker Compose    |
| Express.js  | Mongoose (ODM) | Postman / Insomnia         |
| RESTful API |                | Git                        |

---

## 📋 Pré-requisitos

- Docker instalado e rodando
- Node.js (v18+)
- npm ou Yarn

---

## ⚙ Configuração do Ambiente

```bash
# 1. Clone o repositório
git clone https://github.com/VictorRochaSilva/todo-backend.git
cd todo-backend

# 2. Instale as dependências
npm install

# 3. Suba o MongoDB com Docker
docker-compose up -d

```
🚀 Execução do Projeto

# Variáveis de Ambiente
copie do env.example os dados para o arquivo .env na raiz do projeto.

# Para rodar em produção:
npm start

# Para desenvolvimento (com hot-reload):
npx nodemon src/server.js
Acesse http://localhost:3001/api/tasks