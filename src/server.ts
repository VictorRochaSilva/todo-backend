import 'reflect-metadata';
import { app, database } from './config/app';

const PORT = 8085;

async function startServer() {
  await database.connect('admin'); // conecta MongoDB antes de rodar o app

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
}

startServer();
