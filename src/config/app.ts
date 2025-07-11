import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import dotenv from 'dotenv';
import './database';
import { TaskController } from '../controllers/TaskController';

dotenv.config();
useContainer(Container);

export const app = createExpressServer({
    controllers: [TaskController],
    cors: true,
});
