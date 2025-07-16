import 'reflect-metadata';
import { app } from './config/app';
import connectMongo from './config/database';

const PORT = 8085;

async function startServer() {
  await connectMongo(); // só continua quando o banco estiver pronto

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
}

startServer();
