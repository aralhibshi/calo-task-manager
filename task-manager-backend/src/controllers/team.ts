// Dependencies
import { Request, Response } from 'express';
import { Model } from 'mongoose';

// Team Model/Schema and Interface
import { ITeam, TeamModel } from '../models/Team';
const Team: Model<ITeam> = TeamModel;

// User Model/Schema and Interface
import { IUser, UserModel } from '../models/User';
const User: Model<IUser> = UserModel;

// Create - Team (M-M, Teams and Users)
export const team_create_post = async (req: Request, res: Response): Promise<void> => {
    try {
        // Create Team
        const team: ITeam = new Team(req.body.team);
        await team.save();

        // IDs
        const userID: string = req.body.user ? req.body.user.user.id : req.body.id;
        const teamID: string = team._id;

        console.log(userID);

        // Push Current User ID to 'users' in New Team
        await Team.findByIdAndUpdate(
            teamID,
            {
                $push: {
                    users: {
                        user: userID,
                        isOwner: true
                    }
                }
            },
            {new: true}
        );

        // Push Team ID to 'teams' in User
        const user: IUser | null = await User.findByIdAndUpdate(
            userID,
            {$push: {teams: teamID}},
            {new: true}
        );

        res.json({'message': {team}, user}).status(200);
    }
    catch (err) {
        console.log('Error Creating Team');
        console.log(err);
        res.json({'message': err}).status(400);
    }
}

// Read - Team (Team Index with Limit)
export const team_index_get = async (req: Request, res: Response): Promise<void> => {
    try {
        // Limit for Amount of Teams to Get
        let limit: number | undefined = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

        // Find Teams Based on Limit
        if (limit) {
            const teams: ITeam[] = await Team.find();
            res.json({'message': teams}).status(200);
        } else {
            res.json({'message': 'Error Getting Limit'}).status(400);
        }
    }
    catch (err) {
        console.log('Error Getting Teams');
        res.json({'message': err}).status(400);
    }
}

// Read - Team (User's Teams)
export const team_user_index_get = async (req: Request, res: Response): Promise<void> => {
    try {
        const teams = await User.findById(req.query.id).populate('teams');
        res.json(teams?.teams).status(200);
    }
    catch (err) {
        console.log(err);
        res.json({'message': err}).status(400);
    }
}

// Update - Team (If User is Owner)
export const team_edit_post = async (req: Request, res: Response): Promise<void> => {
    try {
        const team: ITeam | null = await Team.findById(req.body.id)
        
    }
    catch (err) {
        console.log('Error Updating Team')
        res.json({'message': err}).status(400)
    }
}