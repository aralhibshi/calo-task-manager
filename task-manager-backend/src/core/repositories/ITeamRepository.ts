import { ITeam } from "../entities/Team";

export interface ITeamRepository {
  createTeam(teamData: ITeam): Promise<ITeam>;
  getAllTeams(): Promise<ITeam[]>;
  updateTeam(teamId: string, teamData: ITeam): Promise<ITeam | null>;
  deleteTeam(teamId: string): Promise<void>;
  addUserToTeam(userId: string, teamId: string): Promise<void>;
}