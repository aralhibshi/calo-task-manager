// Dependencies
import React, { createContext } from 'react';

// Interfaces
import { IUserToken } from '../interfaces/IUser';

// UserIDContext Interface
interface UserIDContextType {
  userID: IUserToken | undefined | any;
  setUserID: React.Dispatch<React.SetStateAction<IUserToken | undefined>>;
};

export const UserIDContext = createContext<UserIDContextType>({
  userID: undefined,
  setUserID: () => {}
});

export default UserIDContext;