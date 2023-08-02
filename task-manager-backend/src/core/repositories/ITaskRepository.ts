import { ITask } from "../entities/Task";

export interface ITaskRepository {
  createTask(taskData: ITask): Promise<ITask>;
  getAllTasks(): Promise<ITask[]>;
  findTasksByTeamId(teamId: any): Promise<ITask[] | null>;
  updateTask(taskId: any, taskData: ITask): Promise<ITask | null>;
  deleteTasksByTeamId(teamId: any): Promise<void>;
  addUserToTask(userId: any, taskId: any): Promise<void>;
}