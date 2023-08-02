import { IUser } from "../entities/User";
import { ITeam } from "../entities/Team";

export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  findAll(): Promise<IUser[]>;
  findUsersByTeamId(teamId: string): Promise<IUser[]>;
  addTeamToUser(userId: string, teamId: string): Promise<void>;
  getUserTeams(userId: string): Promise<ITeam[]>;
}