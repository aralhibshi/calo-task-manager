// import { ITeam } from '../../domain/entities/Team';
// import { ITask } from '../../domain/entities/Task';
// import { IUser } from '../../domain/entities/User';
// import { ITeamRepository } from '../../infrastructure/repositories/TeamRepository';
// import { IUserRepository } from '../../infrastructure/repositories/UserRepository';
// import { ITaskRepository } from '../repositories/ITaskRepository';

// export class TeamService {
//   private readonly teamRepository: ITeamRepository;
//   private readonly userRepository: IUserRepository;
//   private readonly taskRepository: ITaskRepository;

//   constructor(
//     teamRepository: ITeamRepository,
//     userRepository: IUserRepository,
//     taskRepository: ITaskRepository
//   ) {
//     this.teamRepository = teamRepository;
//     this.userRepository = userRepository;
//     this.taskRepository = taskRepository;
//   }

//   async createTeam(teamData: ITeam, userId: string): Promise<{ team: ITeam; user: IUser | null }> {
//     const team: ITeam = await this.teamRepository.createTeam(teamData);

//     const updatedUser: IUser | null = await this.userRepository.addTeamToUser(userId, team._id);

//     return { team, user: updatedUser };
//   }

//   async getAllTeams(): Promise<ITeam[]> {
//     return this.teamRepository.getAllTeams();
//   }

//   async getUserTeams(userId: string): Promise<ITeam[] | null> {
//     return this.userRepository.getUserTeams(userId);
//   }

//   async updateTeam(teamId: string, teamData: ITeam): Promise<ITeam | null> {
//     return this.teamRepository.updateTeam(teamId, teamData);
//   }

//   async deleteTeam(teamId: string): Promise<void> {
//     const tasks: ITask[] = await this.taskRepository.findTasksByTeamId(teamId);

//     const taskIds: string[] = tasks.map((task) => task._id.toString());

//     await this.userRepository.removeTeamAndTasksFromUsers(teamId, taskIds);
//     await this.taskRepository.deleteTasksByTeamId(teamId);
//     await this.teamRepository.deleteTeam(teamId);
//   }

//   async addUserToTeam(userId: string, teamId: string): Promise<void> {
//     await this.teamRepository.addUserToTeam(userId, teamId);
//     await this.userRepository.addTeamToUser(userId, teamId);
//   }
// }
