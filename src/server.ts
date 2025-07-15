import 'reflect-metadata';
import { app } from './config/app';

const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
