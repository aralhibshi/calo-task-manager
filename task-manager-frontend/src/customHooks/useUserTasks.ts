// Depdencies
import { Dispatch, useEffect, useState } from 'react';
import Axios from 'axios';

// Interfaces
import { ITask } from '../interfaces/ITask';
import { IUserToken } from '../interfaces/IUser';

const useUserTasks = (userID: IUserToken | null, refetch: any) => {
  const [tasks, setTasks] = useState<Array<ITask> | undefined>();

  useEffect(() => {
    const fetchUserTasks = () => {
      if (userID?.user.id) {
        Axios.get(`/task/user/index?id=${userID.user.id}`)
          .then((res) => {
            let allTasks = res.data;
            setTasks(allTasks);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    fetchUserTasks();
  }, [userID, refetch]);

  return tasks;
};

export default useUserTasks;