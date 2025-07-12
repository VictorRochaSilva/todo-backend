# 📝 To-Do List API

Uma API RESTful para gerenciamento de tarefas, desenvolvida com **Node.js**, **Express** e **Mongoose**, utilizando **MongoDB** em container Docker para persistência de dados.

---

## 📚 Índice

- [🛠 Tecnologias](#-tecnologias)
- [📋 Pré-requisitos](#-pré-requisitos)
- [⚙ Configuração do Ambiente](#-configuração-do-ambiente)
- [🔐 Variáveis de Ambiente](#-variáveis-de-ambiente)
- [🚀 Execução do Projeto](#-execução-do-projeto)
- [🌐 Rotas da API](#-rotas-da-api)

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

## Variáveis de Ambiente
copie do env.example os dados para o arquivo .env na raiz do projeto.

## Para rodar em produção:
npm start

## Para desenvolvimento (com hot-reload):
npm run dev

## 📡 Rotas da API

| Método | Rota                | Descrição                              | Parâmetros (Body/Query)               |
|--------|---------------------|----------------------------------------|---------------------------------------|
| `GET`  | `/tasks`        | Lista todas as tarefas (com paginação) | `?page=1&limit=10`<br>`?completed=true`<br>`?search=termo`<br>`?dueDateFrom=YYYY-MM-DD&dueDateTo=YYYY-MM-DD` |
| `POST` | `/tasks`        | Cria uma nova tarefa                   | **Body (JSON):**<br>`{ "title": string (obrigatório), "description": string (opcional), "dueDate": Date (opcional) }` |
| `PATCH`| `/tasks/:id`    | Atualiza uma tarefa                    | **Body (JSON):**<br>`{ "title": string, "description": string, "dueDate": Date, "completed": boolean }` (campos opcionais) |
| `DELETE`| `/tasks/:id`   | Remove uma tarefa                      | - |