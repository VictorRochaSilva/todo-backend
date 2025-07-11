import { Service } from 'typedi';
import {
    JsonController,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    QueryParams,
    BadRequestError
} from 'routing-controllers';
import { TaskService } from '../services/TaskService';
import { Inject } from 'typedi';
import { ITask } from '../models/Task';

interface TaskQuery {
    completed?: string;
    dueDateFrom?: string;
    dueDateTo?: string;
    search?: string;
    page?: number;
    limit?: number;
}

@Service() // ESSENCIAL
@JsonController('/tasks')
export class TaskController {
    constructor(
        @Inject() private readonly taskService: TaskService
    ) { }

    @Get()
    getAll(@QueryParams() query: TaskQuery) {
        return this.taskService.getAll(query);
    }

    @Post()
    create(@Body() body: Partial<ITask>) {
        if (!body.title) throw new BadRequestError('Título é obrigatório');
        return this.taskService.create(body);
    }

    @Patch('/:id')
    update(@Param('id') id: string, @Body() body: Partial<ITask>) {
        return this.taskService.update(id, body);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.taskService.delete(id);
    }
}
