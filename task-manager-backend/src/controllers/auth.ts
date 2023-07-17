// Dependencies
import { Request, Response } from 'express'
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Model/Schema and Interface
import { IUser, UserModel } from '../models/User';
const User: Model<IUser> = UserModel;

// Create - User (Sign Up)
export const auth_signup_post = async (req: Request, res: Response) => {
    try {
        const user: IUser = new User(req.body);

        const hash: string = bcrypt.hashSync(req.body.password, 10);
        user.password = hash;

        await user.save();
        res.json({'message': 'User Created!'});
    }
    catch (err) {
        console.log('Error Creating User');
        res.json({'message': err});
    }
};

// Authentication - Sign In
// exports.auth_signin_post = async (req, res) => {
//     try {
//         const { emailAddress, password} = req.body;

//         const user = await User.findOne({})
//         res.json({'message': 'User Authenticated!'})
//     }
//     catch (err) {
//         console.log('Erorr Authenticating User')
//         res.json({'message': err})
//     }
// }