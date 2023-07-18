// User Interface
export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    teams: Array<string>;
    tasks: Array<string>;
    createdAt: Date;
    updatedAt: Date;
}