import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { TaskController } from '../controllers/TaskController';
import { Database } from './database';

const mongoUri = 'mongodb://admin:senha123@mongodb:27017/?authSource=admin';

// Instancia a classe Database
export const database = new Database(mongoUri);

useContainer(Container);

export const app = createExpressServer({
    controllers: [TaskController],
    cors: true,
});
