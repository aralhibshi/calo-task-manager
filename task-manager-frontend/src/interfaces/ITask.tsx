// Other Interfaces
import { ITeam } from "./ITeam";

// Task Interface
export interface ITask {
    _id: string;
    title: string;
    description: string;
    status: string;
    users: Array<string>
    team: string | ITeam;
    createdAt: Date;
    updatedAt: Date;
}

// New Task Interface
export interface INewTask {
    title: string;
    description: string;
}