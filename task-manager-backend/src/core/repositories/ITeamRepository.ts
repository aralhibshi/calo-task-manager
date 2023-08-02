import { ITeam } from "../entities/Team";

export interface ITeamRepository {
  createTeam(teamData: ITeam): Promise<ITeam>;
  getAllTeams(): Promise<ITeam[]>;
  updateTeam(teamId: any, teamData: ITeam): Promise<ITeam | null>;
  deleteTeam(teamId: any): Promise<void>;
  addUserToTeam(userId: any, teamId: any, isOwner: boolean): Promise<void>;
}