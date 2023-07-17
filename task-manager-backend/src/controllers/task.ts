// Dependencies
import { Request, Response } from 'express'
import { Model } from 'mongoose';

// Task Model/Schema and Interface
import { ITask, TaskModel } from '../models/Task';
const Task: Model<ITask> = TaskModel;

// User Model/Schema and Interface
import { IUser, UserModel } from '../models/User';
const User: Model<IUser> = UserModel;

// Create - Task (M-M, Tasks and Users)
export const task_create_post = async (req: Request, res: Response) => {
    try {
        // Create Task
        const task: ITask = new Task(req.body);
        await task.save();

        // Push User ID to 'users' in New Task
        await Task.findByIdAndUpdate(
            task._id,
            {$push: {users: '64b3f69f447e0628f0534cf6'}},
            {new: true}
        );

        // Push New Task ID to User 'tasks'
        const user: IUser | null = await User.findByIdAndUpdate(
            req.body.id,
            {$push: {tasks: task._id}},
            {new: true}
        );

        res.json({'message': 'Task Created!', task, user}).status(200);
    }
    catch (err) {
        console.log('Error Creating Task');
        res.json({'message': err}).status(400);
    }
};

// Read - Task (With Limit)
export const task_index_get = async (req: Request, res: Response) => {
    try {
        // Limit for Amount of Tasks to Get
        let limit: number | undefined = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

        // Find Tasks Based on Limit
        if (limit) {
            const tasks = await Task.find().limit(limit).populate('users');
            res.json({tasks}).status(200);
        } else {
            res.json({'message': 'Cannot Get Limit'});
        }
    }
    catch (err) {
        console.log('Error Getting Tasks');
        res.json({'message': err}).status(400);
    }
};