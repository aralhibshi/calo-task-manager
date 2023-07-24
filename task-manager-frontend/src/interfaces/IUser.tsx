import { ITask } from "./ITask";

// User Interface
export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    teams: Array<string> | Array<ITask>;
    tasks: Array<string>;
    createdAt: Date;
    updatedAt: Date;
}

// NewUser Interface
export interface INewUser {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string; 
}


// UserLogin Interface
export interface IUserLogin {
    emailAddress: string;
    password: string;
}

// UserToken Interface
export interface IUserToken {
    user: {
        id: string;
        name: string;
    }
}

// User All Interface
export interface IUserAll {
    _id?: string;
    id: string;
    name: string;
}