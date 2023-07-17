// Dependencies
import { Request, Response } from 'express'
import { Model } from 'mongoose';

// Model/Schema and Interface
import { ITask, TaskModel } from '../models/Task';
const Task: Model<ITask> = TaskModel;

// Create - Task
export const task_create_post = async (req: Request, res: Response) => {
    try {
        const task: ITask = new Task(req.body);

        await task.save();
        res.json({'message': 'Task Created!'});
    }
    catch (err) {
        console.log('Error Creating Task');
        res.json({'message': err});
    }
};