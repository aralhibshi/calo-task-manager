import { Model } from 'mongoose';
import { ITask } from '../../core/entities/Task';
import { TaskModel } from '../../core/entities/Task';
import { ITaskRepository } from '../../core/repositories/ITaskRepository';

export class TaskRepository implements ITaskRepository {
  private readonly Task: Model<ITask>;

  constructor() {
    this.Task = TaskModel;
  }

  async createTask(taskData: ITask): Promise<ITask> {
    const task: ITask = new this.Task(taskData);
    return task.save();
  }

  async getAllTasks(): Promise<ITask[]> {
    return this.Task.find().exec();
  }

  async findTasksByTeamId(teamId: string): Promise<ITask[] | null> {
    return this.Task.find({team: teamId}).exec();
  }

  async updateTask(taskId: string, taskData: ITask): Promise<ITask | null> {
    return this.Task.findByIdAndUpdate(taskId, taskData, { new: true }).exec();
  }

  async deleteTasksByTeamId(teamId: string): Promise<void> {
    await this.Task.deleteMany({team: teamId}).exec();
  }

  async addUserToTask(userId: string, taskId: string): Promise<void> {
    await this.Task.findByIdAndUpdate(
      taskId,
      {
        $push: {
          user: userId
        } 
      }
    )
  }
}