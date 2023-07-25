// Depdencies
import { useEffect, useState } from 'react';
import Axios from 'axios';

// Interfaces
import { IUserAll, IUserToken } from '../interfaces/IUser';

const useUserAll = (userID: IUserToken, teamID: string, refetch: any): Array<IUserAll> => {
  const [allUsers, setAllUsers] = useState<Array<IUserAll>>();

  useEffect(() => {
    const fetchUserAll = () => {
      if (userID?.user.id) {
        Axios.get(`/user/others/index?userId=${userID.user.id}&teamId=${teamID}`)
        .then(res => {
          let users = res.data
          setAllUsers(users);
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
    fetchUserAll();
  }, [userID, teamID, refetch]);

    return allUsers!
};

export default useUserAll;