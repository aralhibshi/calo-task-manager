import { Model } from 'mongoose';
import { IUser } from '../../core/entities/User';
import { UserModel } from '../../core/entities/User';
import { ITeam } from '../../core/entities/Team';
import { IUserRepository } from '../../core/repositories/IUserRepository';

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

  async addTeamToUser(userId: string, teamId: string): Promise<void> {
    await this.User.findByIdAndUpdate(
      teamId,
      {
        $push: {
          users: {
            user: userId,
            isOwner: true
          }
        }
      },
      {
        new: true
      }
    )
  }

  async getUserTeams(userId: string): Promise<any> {
    const user = await this.User.findById(userId).populate('teams');
    return user?.teams
  }
}