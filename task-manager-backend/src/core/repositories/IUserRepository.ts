import { IUser } from "../entities/User";
import { ITeam } from "../entities/Team";

export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  findAll(): Promise<IUser[]>;
  findUsersByTeamId(teamId: any): Promise<IUser[]>;
  updateUser(teamId: any, taskIds: any): Promise<void>;
  addTeamToUser(userId: any, teamId: any): Promise<IUser | null>;
  getUserTeams(userId: any): Promise<ITeam[]>;
  removeTeamAndTasksFromUsers(teamId: any): Promise<void>
}