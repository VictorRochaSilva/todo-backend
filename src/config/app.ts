import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { TaskController } from '../controllers/TaskController';
import { Database } from './database';

useContainer(Container);

const mongoUri = process.env.MONGO_URI || 'mongodb://mongodb:27017';

export const database = new Database(mongoUri);

export const app = createExpressServer({
    controllers: [TaskController],
    cors: true,
});
