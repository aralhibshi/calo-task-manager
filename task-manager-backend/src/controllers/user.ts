// Dependencies
import { Request, Response } from 'express'
import { Model } from 'mongoose';

// Task Model/Schema and Interface
import { ITask, TaskModel } from '../models/Task';
const Task: Model<ITask> = TaskModel;

// User Model/Schema and Interface
import { IUser, UserModel } from '../models/User';
const User: Model<IUser> = UserModel;

// Read - User Detail
export const user_detail_get = async (req: Request | any, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findById(req.query.id)
      .populate('tasks')
      .populate('teams');

    if (user) {
      res.json(user).status(200);
    }
  }
  catch (err) {
    console.log(err);
    res.json({'message': err}).status(400);
  }
}