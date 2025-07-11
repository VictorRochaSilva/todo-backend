To-Do List API - Node.js + Express + MongoDB
Uma API RESTful para gerenciamento de tarefas, desenvolvida com Node.js, Express e Mongoose, utilizando MongoDB em Docker para persistência de dados.

📌 Índice
Tecnologias

Pré-requisitos

Configuração do Ambiente

Execução do Projeto

Variáveis de Ambiente

Rotas da API

Estrutura do Projeto

Testes

Contribuição

🛠 Tecnologias
Backend	Banco de Dados	Ferramentas
Node.js	MongoDB (Docker)	Docker / Docker Compose
Express.js	Mongoose (ODM)	Postman / Insomnia
RESTful API		Git
📋 Pré-requisitos
Docker

Node.js (v18+)

npm ou Yarn

⚙ Configuração do Ambiente
1. Clone o repositório
bash
git clone https://github.com/VictorRochaSilva/todo-backend.git
cd todo-backend
2. Instale as dependências
bash
npm install
3. Configure o MongoDB (Docker)
Na raiz do projeto (onde está o docker-compose.yml):

bash
docker-compose up -d
🚀 Execução do Projeto
1. Inicie o servidor
bash
npm start
# Para desenvolvimento (com hot-reload):
npx nodemon src/server.js
2. Verifique a API
Acesse http://localhost:3001/api/tasks.
Deve retornar:

json
[]
🔌 Variáveis de Ambiente
Crie um arquivo .env no diretório backend/:

ini
MONGODB_URI=mongodb://admin:senha123@localhost:27017/todo?authSource=admin
PORT=3001
🌐 Rotas da API
Método	Rota	Descrição
GET	/api/tasks	Lista todas as tarefas (com paginação)
POST	/api/tasks	Cria uma nova tarefa
PATCH	/api/tasks/:id	Atualiza uma tarefa
DELETE	/api/tasks/:id	Remove uma tarefa
Exemplo de requisição POST
json
{
  "title": "Estudar Node.js",
  "description": "Aprender Mongoose",
  "dueDate": "2024-12-31"
}
Exemplo de resposta (GET)
json
{
  "tasks": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalTasks": 25
  }
}
📂 Estrutura do Projeto
text
backend/
├── src/
│   ├── models/       # Modelos do MongoDB (Task.js)
│   ├── routes/       # Rotas da API (tasks.js)
│   └── server.js     # Configuração do Express
├── .env              # Variáveis de ambiente
├── package.json
└── docker-compose.yml
🧪 Testes
Para testar as rotas, utilize:

Postman

Insomnia

curl (exemplo):

bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Tarefa de Teste"}'
🤝 Contribuição
Faça um fork do projeto.

Crie uma branch (git checkout -b feature/nova-funcionalidade).

Commit suas alterações (git commit -m "Adiciona filtro por status").

Push para a branch (git push origin feature/nova-funcionalidade).

Abra um Pull Request.

🎯 Status do Projeto: Concluído e funcional.