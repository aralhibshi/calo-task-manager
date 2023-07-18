// Team Interface
export interface ITeam {
    _id: string;
    name: string;
    description: string;
    users: Array<string>;
    createdAt: Date;
    updatedAt: Date;
}