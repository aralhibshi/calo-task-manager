// Other Interfaces
import { ITeam } from "./ITeam";

// Team Props Interface
export interface ITeamProps {
  team: ITeam;
  setRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
}