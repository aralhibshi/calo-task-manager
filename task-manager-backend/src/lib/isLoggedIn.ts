// Dependencies
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

// Interfaces
// import { IPayload } from "../interfaces/IPayload";

// Dotenv
dotenv.config()

export const isLoggedIn = (req: Request | any, res: Response | any, next: any) => {
  let token: string = '';

  let authorizationToken = req.header('Authorization');

  if (authorizationToken) {
    authorizationToken = authorizationToken.replace('Bearer', '');
    token = authorizationToken;
  }

  if (!token) {
    return res.status(401).json({'message': 'Not Authorizaed'});
  }

  try {
    const decoded: any = jwt.verify(token, process.env.SECRET!);
    req.user = decoded.user;
    next();
  }
  catch (err) {
    return res.status(401).json({'message': 'Invalid Token'});
  }
}