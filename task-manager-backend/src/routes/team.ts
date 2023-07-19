// Dependencies
import express, { Router } from 'express';
const router: Router = express.Router();

// Controller
import * as teamCtrl from '../controllers/team';

// Routes
router.post('/team/add', teamCtrl.team_create_post);
router.get('/team/index', teamCtrl.team_index_get);
router.get('/team/user/index', teamCtrl.team_user_index_get);

export default router;