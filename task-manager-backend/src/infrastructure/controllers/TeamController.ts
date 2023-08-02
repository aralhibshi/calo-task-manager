// // Presentation/Controllers/TeamController.ts

// import { Request, Response } from 'express';
// import { TeamService } from '../../Application/Services/TeamService';
// import { TeamRepository } from '../../Infrastructure/Data/TeamRepository';
// import { UserRepository } from '../../Infrastructure/Data/UserRepository';
// import { TaskRepository } from '../../Infrastructure/Data/TaskRepository';

// export const team_create_post = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const teamService = new TeamService(new TeamRepository(), new UserRepository(), new TaskRepository());

//     const { team } = req.body;
//     const userId = req.body.user ? req.body.user.user.id : req.body.id;

//     const { team: createdTeam, user } = await teamService.createTeam(team, userId);

//     res.json({ message: 'Team Created!', team: createdTeam, user }).status(200);
//   } catch (err) {
//     console.log('Error Creating Team');
//     console.log(err);
//     res.json({ message: err }).status(400);
//   }
// };

// export const team_index_get = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const teamService = new TeamService(new TeamRepository(), new UserRepository(), new TaskRepository());
//     const teams = await teamService.getAllTeams();
//     res.json({ message: teams }).status(200);
//   } catch (err) {
//     console.log('Error Getting Teams');
//     res.json({ message: err }).status(400);
//   }
// };

// export const team_user_index_get = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.query;
//     const teamService = new TeamService(new TeamRepository(), new UserRepository(), new TaskRepository());
//     const teams = await teamService.getUserTeams(id);
//     res.json(teams).status(200);
//   } catch (err) {
//     console.log(err);
//     res.json({ message: err }).status(400);
//   }
// };

// export const team_edit_post = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const teamService = new TeamService(new TeamRepository(), new UserRepository(), new TaskRepository());
//     const { id } = req.query;
//     const teamData = req.body.team;
//     const team = await teamService.updateTeam(id, teamData);
//     res.json({ message: 'Team Updated!', team }).status(200);
//   } catch (err) {
//     console.log('Error Updating Team');
//     res.json({ message: err }).status(400);
//   }
// };

// export const team_delete_post = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const teamService = new TeamService(new TeamRepository(), new UserRepository(), new TaskRepository());
//     const { teamId, userId } = req.query;
//     await teamService.deleteTeam(teamId);
//     res.json({ message: 'Team Deleted!' }).status(200);
//   } catch (err) {
//     console.log('Error Deleting Team');
//     console.log(err);
//     res.json({ message: err }).status(400);
//   }
// };

// export const team_user_add_post = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const teamService = new TeamService(new TeamRepository(), new UserRepository(), new TaskRepository());
//     const { userId, teamId } = req.query;
//     await teamService.addUserToTeam(userId, teamId);
//     res.json({ message: 'User added to team!' }).status(200);
//   } catch (err) {
//     console.log('Error Adding User to Team', err);
//     res.json({ message: err }).status(400);
//   }
// };
