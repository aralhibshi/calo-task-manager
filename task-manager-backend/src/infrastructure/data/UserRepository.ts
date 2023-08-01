// Infrastructure/Data/UserRepository.ts

import { Model } from 'mongoose';
import { IUser } from '../../domain/entities/User';
import { IUserRepository } from '../../application/repositories/IUserRepository';
import { UserModel } from '../../domain/entities/User';

export class UserRepository implements IUserRepository {
  private readonly User: Model<IUser>;

  constructor() {
    this.User = UserModel;
  }

  async findById(id: string): Promise<IUser | null> {
    return this.User.findById(id).exec();
  }

  async findAll(): Promise<IUser[]> {
    return this.User.find().exec();
  }

  async findUsersByTeamId(teamId: string): Promise<IUser[]> {
    const team: any = await this.User.findById(teamId).populate('users.user').exec();
    return team?.users.map((user: any) => user.user);
  }
}
