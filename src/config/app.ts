import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { TaskController } from '../controllers/TaskController';

useContainer(Container);

export const app = createExpressServer({
    controllers: [TaskController],
    cors: true,
});
