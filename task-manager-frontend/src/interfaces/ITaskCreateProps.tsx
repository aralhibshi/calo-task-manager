// Param Interfaces
import { INewTask } from "./ITask";
import { INewUser, IUserToken } from "./IUser";

// Function Type
type MyFunctionType = (task: INewTask, user?: IUserToken) => void

// Task Create Props
export interface ITaskCreateProps {
  create: MyFunctionType;
}