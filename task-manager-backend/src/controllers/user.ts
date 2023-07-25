// Dependencies
import { Request, Response } from 'express'
import { Model } from 'mongoose';

// Task Model/Schema and Interface
import { ITask, TaskModel } from '../models/Task';
const Task: Model<ITask> = TaskModel;

// User Model/Schema and Interface
import { IUser, UserModel } from '../models/User';
const User: Model<IUser> = UserModel;

// Team Model/Schema and Interface
import { ITeam, TeamModel } from '../models/Team';
const Team: Model<ITeam> = TeamModel;

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

// Read - All Users without Current User and Team Users
export const user_others_index_get = async (req: Request, res: Response): Promise<void> => {
  try {
    // IDs
    const teamId = req.query.teamId;

    // Find All Users
    const users = await User.find();
    let allUsers: any = [];

    // Find All Team Users
    const team: any = await Team.findById(teamId);
    let allTeamUsers: any = [];

    // Add All Team Users to Array
    for (let i = 0; i < team?.users.length!; i++) {
      allTeamUsers.push(team?.users[i].user.toString());
    }

    // Add All Users except for current User and Team Users
    for (let i = 0; i < users.length; i++) {
      if (team && users) {
        if (!allTeamUsers.includes(users[i]._id.toString())) {
          allUsers.push({ _id: users[i]._id, name: users[i].firstName + ' ' + users[i].lastName });
        }
      }
    }
    res.json(allUsers)
  } 
  catch (err) {
    console.log('Error Getting Users')
    res.json({'message': err})
  }
}