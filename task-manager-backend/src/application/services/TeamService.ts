import { ITeam } from '../../core/entities/Team';
import { IUser } from '../../core/entities/User';
import { ITeamRepository } from '../../core/repositories/ITeamRepository';
import { IUserRepository } from '../../core/repositories/IUserRepository';
import { ITaskRepository } from '../../core/repositories/ITaskRepository';

export class TeamService {
  private readonly teamRepository: ITeamRepository;
  private readonly userRepository: IUserRepository;
  private readonly taskRepository: ITaskRepository;

  constructor(
    teamRepository: ITeamRepository,
    userRepository: IUserRepository,
    taskRepository: ITaskRepository
  ) {
    this.teamRepository = teamRepository;
    this.userRepository = userRepository;
    this.taskRepository = taskRepository;
  }

  async createTeam(teamData: ITeam, userId: string): Promise<{ team: ITeam; user: IUser | null }> {
    console.log(userId)
    const team: ITeam = await this.teamRepository.createTeam(teamData);
    await this.teamRepository.addUserToTeam(userId, team._id, true);

    const updatedUser: IUser | null = await this.userRepository.addTeamToUser(userId, team._id);

    return { team, user: updatedUser };
  }

  async getAllTeams(): Promise<ITeam[]> {
    return this.teamRepository.getAllTeams();
  }

  async getUserTeams(userId: any): Promise<ITeam[] | null> {
    return this.userRepository.getUserTeams(userId);
  }

  async updateTeam(teamId: any, teamData: ITeam): Promise<ITeam | null> {
    return this.teamRepository.updateTeam(teamId, teamData);
  }

  async deleteTeam(teamId: any): Promise<void> {
    await this.userRepository.removeTeamAndTasksFromUsers(teamId);
    await this.taskRepository.deleteTasksByTeamId(teamId);
    await this.teamRepository.deleteTeam(teamId);
  }

  async addUserToTeam(userId: any, teamId: any): Promise<void> {
    await this.teamRepository.addUserToTeam(userId, teamId, false);
    await this.userRepository.addTeamToUser(userId, teamId);
  }
}