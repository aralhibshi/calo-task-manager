// Dependencies
import { Request, Response } from 'express'
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Interfaces
import { IPayload } from '../core/interfaces/IPayload';

// Dotenv
dotenv.config();

// Model/Schema and Interface
import { IUser, UserModel } from '../core/entities/User';
const User: Model<IUser> = UserModel;

// Create - User (Sign Up)
export const auth_signup_post = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: IUser = new User(req.body);

        const hash: string = bcrypt.hashSync(req.body.password, 10);
        user.password = hash;

        await user.save();
        res.json({'message': 'User Created!', user}).status(200);
    }
    catch (err) {
        console.log('Error Creating User');
        console.log(err);
        res.json({'message': err}).status(400);
    }
};

// Authentication - Sign In
export const auth_signin_post = async (req: Request, res: Response): Promise<void> => {
    try {
        const { emailAddress, password}: {emailAddress: string, password: string} = req.body;

        const user: IUser | null = await User.findOne({ emailAddress });
        console.log(user);

        if (!user) {
            res.json({'message': 'User Not Found!'}).status(400);
        } else {

            // Compare Password
            const isMatch: boolean = bcrypt.compareSync(password, user.password);

            // Wrong Password
            if (!isMatch) {
                res.json({'message': 'Wrong Password!'}).status(400);
            } else {

                // Payload
                const payload: IPayload = {
                    user: {
                        id: user._id,
                        name: user.firstName
                    }
                };

                // Generate JWT
                const secret: string = process.env.SECRET!;

                jwt.sign(
                    payload,
                    secret,
                    { expiresIn: 36000000 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({ token }).status(200);
                    }
                );
            }
        }
    }
    catch (err) {
        console.log('Error Authenticating User');
        res.json({'message': err}).status(400);
    }
};