import { Model } from 'mongoose';
import { ITeam } from '../../core/entities/Team';
import { TeamModel } from '../../core/entities/Team';
import { ITeamRepository } from '../../core/repositories/ITeamRepository';

export class TeamRepository implements ITeamRepository {
  private readonly Team: Model<ITeam>;

  constructor() {
    this.Team = TeamModel;
  }

  async createTeam(teamData: ITeam): Promise<ITeam> {
    console.log('team created')
    const team: ITeam = new this.Team(teamData);
    return team.save();
  }

  async getAllTeams(): Promise<ITeam[]> {
    return this.Team.find().exec();
  }

  async updateTeam(teamId: string, teamData: ITeam): Promise<ITeam | null> {
    return this.Team.findByIdAndUpdate(teamId, teamData, { new: true }).exec();
  }

  async deleteTeam(teamId: string): Promise<void> {
    await this.Team.findByIdAndDelete(teamId).exec();
  }

  async addUserToTeam(userId: string, teamId: string, isOwner: boolean): Promise<void> {
    await this.Team.findByIdAndUpdate(
      teamId,
      {
        $push: {
          users: {
            user: userId,
            isOwner: isOwner,
          },
        },
      },
      { new: true }
    ).exec();
  }
}
