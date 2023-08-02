import { Model } from 'mongoose';
import { IUser, UserModel } from '../../core/entities/User';
import { IUserRepository } from '../../core/repositories/IUserRepository';
import { ITask, TaskModel } from '../../core/entities/Task';
import { ITeam, TeamModel } from '../../core/entities/Team';

export class UserRepository implements IUserRepository {
  private readonly User: Model<IUser>;
  private readonly Team: Model<ITeam>
  private readonly Task: Model<ITask>;

  constructor() {
    this.User = UserModel;
    this.Team = TeamModel;
    this.Task = TaskModel;
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

  async updateUser(teamId: any, taskIds: any): Promise<void> {
    await this.User.updateMany(
      { teams: teamId },
      {
        $pull: {
          teams: teamId,
          tasks: { $in: taskIds }
        }
      }
    )
  }

  async addTeamToUser(userId: string, teamId: string): Promise<IUser | null> {
    const user = await this.User.findByIdAndUpdate(
      userId,
      {
        $push: {
          teams: teamId
        }
      },
      {
        new: true
      }
    )
    return user
  }

  async getUserTeams(userId: string): Promise<any> {
    const user = await this.User.findById(userId).populate('teams');
    return user?.teams
  }

  async removeTeamAndTasksFromUsers(teamId: string): Promise<void> {
    await this.Team.findByIdAndDelete(teamId);
  }
}