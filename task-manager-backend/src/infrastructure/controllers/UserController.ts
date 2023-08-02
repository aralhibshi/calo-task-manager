import { Request, Response } from 'express';
import { UserService } from '../../application/services/UserService';
import { UserRepository } from '../persistance/UserRepositoryImpl';

export const user_detail_get = async (req: Request | any, res: Response): Promise<void> => {
  try {
    const userService = new UserService(new UserRepository());
    const user = await userService.getUserById(req.query.id);

    if (user) {
      res.json(user).status(200);
    } else {
      res.json({ message: 'User not found' }).status(404);
    }
  } catch (err) {
    console.log(err);
    res.json({ message: err }).status(500);
  }
};

export const user_others_index_get = async (req: Request, res: Response): Promise<void> => {
  try {
    const { teamId } = req.query;
    const userService = new UserService(new UserRepository());
    const users = await userService.getOtherUsersForTeam(teamId);

    res.json(users).status(200);
  } catch (err) {
    console.log('Error Getting Users');
    res.json({ message: err }).status(500);
  }
};