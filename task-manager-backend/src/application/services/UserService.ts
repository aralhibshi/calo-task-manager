import { IUser } from "../../core/entities/User";
import { IUserRepository } from "../../core/repositories/IUserRepository";
import { ITeamRepository } from "../../core/repositories/ITeamRepository";
import { ITaskRepository } from "../../core/repositories/ITaskRepository";

export class UserService {
  private readonly userRepository: IUserRepository;
  private readonly teamRepository: ITeamRepository;
  private readonly taskRepository: ITaskRepository;

  constructor(
    userRepository: IUserRepository,
    teamRepository: ITeamRepository,
    taskRepository: ITaskRepository
  ) {
    this.userRepository = userRepository;
    this.teamRepository = teamRepository;
    this.taskRepository = taskRepository;
  }

  async getUserById(id: string): Promise<IUser | null> {
    return this.userRepository.findById(id);
  };

  async getOtherUsersForTeam(teamId: any): Promise<any> {
    const users = await this.userRepository.findAll();
    const teamUsers = await this.userRepository.findUsersByTeamId(teamId);

    if (users) {
      const allUsers = users.filter((user) => !teamUsers?.some((teamUser) => teamUser._id.equals(user._id)));
      return allUsers.map((user) => ({ _id: user._id, name: `${user.firstName} ${user.lastName}` }));
    }
  };

  async postTeamToUser(userId: string, teamId: string): Promise<void> {
    await this.userRepository.addTeamToUser(userId, teamId);
  };

  async getUserTeams(userId: string): Promise<any> {
    await this.userRepository.getUserTeams(userId);
  };

  async removeTeamAndTasksFromUsers(teamId: any): Promise<void> {
    const taskIds = await this.taskRepository.findTasksByTeamId(teamId);
    await this.userRepository.updateUser(teamId, taskIds)
    await this.taskRepository.deleteTasksByTeamId(teamId);
    await this.teamRepository.deleteTeam(teamId);
  };
}