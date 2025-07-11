import { Service } from 'typedi';
import { Types } from 'mongoose';
import Task, { ITask } from '../models/Task';

interface TaskQuery {
  completed?: string;
  dueDateFrom?: string;
  dueDateTo?: string;
  search?: string;
  page?: number;
  limit?: number;
}

@Service()
export class TaskService {
  private toDTO(obj: any) {
    // Garante que o id sempre seja string
    const idString =
      obj._id instanceof Types.ObjectId ? obj._id.toHexString() : String(obj._id);
    return { ...obj, id: idString, _id: undefined };
  }

  async getAll(query: TaskQuery) {
    const filter: any = {};

    if (query.completed !== undefined) {
      filter.completed = query.completed === 'true';
    }

    if (query.dueDateFrom || query.dueDateTo) {
      filter.dueDate = {};
      if (query.dueDateFrom) filter.dueDate.$gte = new Date(query.dueDateFrom);
      if (query.dueDateTo) filter.dueDate.$lte = new Date(query.dueDateTo);
    }

    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
      ];
    }

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const tasks = await Task.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ dueDate: 1 })
      .lean();

    const totalTasks = await Task.countDocuments(filter);

    const tasksWithId = tasks.map((task) => this.toDTO(task));

    return {
      tasks: tasksWithId,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalTasks / limit),
        totalTasks,
      },
    };
  }

  async create(data: Partial<ITask>) {
    const task = new Task(data);
    const saved = await task.save();
    return this.toDTO(saved.toObject());
  }

  async update(id: string, data: Partial<ITask>) {
    const updated = await Task.findByIdAndUpdate(id, data, { new: true });
    if (!updated) return null;
    return this.toDTO(updated.toObject());
  }

  async delete(id: string) {
    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) return null;
    return this.toDTO(deleted.toObject());
  }
}
