// Depdencies
import { useEffect, useState } from 'react';
import Axios from 'axios';

// Interfaces
import { IUser, IUserToken } from '../interfaces/IUser';

const useUserDetail = (userID: IUserToken | null) => {
  const [user, setUser] = useState<IUser | undefined>();

  useEffect(() => {
    const fetchUserDetail = () => {
      if (userID?.user.id) {
        Axios.get(`/user/detail?id=${userID.user.id}`)
          .then((res) => {
            let userDetail = res.data;
            setUser(userDetail);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    fetchUserDetail();
  }, [userID]);

  return user;
};

export default useUserDetail;