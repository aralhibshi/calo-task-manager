// Depdencies
import { useEffect, useState } from 'react';
import Axios from 'axios';

// Interfaces
import { ITeam } from '../interfaces/ITeam';
import { IUserToken } from '../interfaces/IUser';

const useUserTeams = (userID: IUserToken | null, refetch: any) => {
  const [teams, setTeams] = useState<Array<ITeam> | undefined>();

  useEffect(() => {
    const fetchUserTeams = () => {
      if (userID?.user.id) {
        Axios.get(`/team/user/index?id=${userID.user.id}`)
          .then((res) => {
            let allTeams = res.data;
            setTeams(allTeams);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    fetchUserTeams();
  }, [userID, refetch]);

  return teams;
};

export default useUserTeams;