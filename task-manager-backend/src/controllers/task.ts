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
export const task_create_post = async (req: Request | any, res: Response): Promise<void> => {
    try {
        // Create Task
        const task: ITask = new Task(req.body.task);
        await task.save();

        // IDs
        const userId: string = req.query.id!;
        const taskId: string = task._id;

        console.log('taskID!', task._id)

        // Push User ID to 'users' in New Task
        await Task.findByIdAndUpdate(
            taskId,
            {
                $push: {users: userId},
                $set: {team: '64b92f3550b4eaeb429c8333'}
            },
            {new: true}
        );

        // Push New Task ID to User 'tasks'
        await User.findByIdAndUpdate(
            userId,
            {
                $push: {tasks: taskId}
            },
            {new: true}
        );

        res.json({'message': {task}}).status(200);
    }
    catch (err) {
        console.log('Error Creating Task');
        console.log(err)
        res.json({'message': err}).status(400);
    }
};

// Read - Task (Task Index with Limit)
export const task_index_get = async (req: Request, res: Response): Promise<void> => {
    try {
        // Limit for Amount of Tasks to Get
        let limit: number | undefined = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

        // Find Tasks Based on Limit
        if (limit) {
            const tasks: ITask[] = await Task.find()
                .limit(limit)
                .populate('users')
                .populate('team');

            res.json(tasks).status(200);
        } else {
            res.json({'message': 'Cannot Get Limit'});
        }
    }
    catch (err) {
        console.log('Error Getting Tasks');
        res.json({'message': err}).status(400);
    }
};


// Read - Task (User's Tasks)
export const task_user_index_get = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await User.findById(req.query.id).populate('tasks');
        res.json(tasks?.tasks).status(200);
    }
    catch (err) {
        console.log(err);
        res.json({'message': err}).status(400);
    }
}

// Update - Task
export const task_edit_post = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body)

        const task = await Task.findByIdAndUpdate(
            req.body.taskID,
            req.body.task
        );
        res.json({'message': 'Task Updated!', task}).status(200);
    }
    catch (err) {
        console.log('Error Updating Task');
        res.json({'message': err}).status(400);
    }
}

// Delete - Task
export const task_delete_post = async (req: Request, res: Response): Promise<void> => {
    try {
        // Find Task in User and Delete

        // Find Task and Delete
        const task = await Task.findByIdAndDelete(req.body.id);
        res.json({'message': 'Task Deleted!', task}).status(200);
    }
    catch (err) {
        console.log('Error Deleting Task');
        res.json({'message': err}).status(400);
    }
}