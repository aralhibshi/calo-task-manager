import { IUser } from "../../domain/entities/User";

export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  findAll(): Promise<IUser[]>;
  findUsersByTeamId(teamId: string): Promise<IUser[]>;
}
