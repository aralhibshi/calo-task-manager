// Depdencies
import { useEffect, useState } from 'react';
import Axios from 'axios';

// Interfaces
import { IUserAll, IUserToken } from '../interfaces/IUser';

const useUserAll = (userID: IUserToken, teamID: string): Array<IUserAll> | undefined => {
  const [allUsers, setAllUsers] = useState<Array<IUserAll>>();

  useEffect(() => {
    const fetchUserAll = () => {
      if (userID?.user.id) {
        Axios.get(`/user/index?userId=${userID.user.id}&teamId=${teamID}`)
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
  }, [userID, teamID]);

  if (allUsers) {
    return allUsers
  }
};

export default useUserAll;