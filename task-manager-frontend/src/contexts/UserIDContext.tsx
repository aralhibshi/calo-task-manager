// Dependencies
import React, { createContext } from 'react';

// Interfaces
import { IUserToken } from '../interfaces/IUser';

// UserIDContext Interface
interface IUserIDContextType {
  userID: IUserToken | undefined | any;
  setUserID: React.Dispatch<React.SetStateAction<IUserToken | undefined>>;
};

export const UserIDContext = createContext<IUserIDContextType>({
  userID: undefined,
  setUserID: () => {}
});

export default UserIDContext;