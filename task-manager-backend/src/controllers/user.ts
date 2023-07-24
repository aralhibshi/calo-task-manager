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

// Read - All Users
export const user_index_get = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find()
    let allUsers = []

    // Add all except for current User to Array
    for (let i = 0; i < users.length; i++) {
      if (req.query.id !== users[i]._id.toString()) {
        allUsers.push({id: users[i]._id, name: users[i].firstName + ' ' + users[i].lastName})
      }
    }
    res.json(allUsers);
  }
  catch (err) {
    console.log('Error Getting All Users')
    res.json({'message': err})
  }
}