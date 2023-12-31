// Other Interfaces
import { ITask } from '../interfaces/ITask'

// Task Props Interface
export interface ITaskProps {
  task: ITask | any;
  setRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
}