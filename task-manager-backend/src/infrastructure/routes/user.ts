// Dependencies
import express, { Router } from 'express';
const router: Router = express.Router();

// Controller
import * as userCtrl from '../controllers/UserController';

// Routes
router.get('/user/detail', userCtrl.user_detail_get);
router.get('/user/others/index', userCtrl.user_others_index_get);

export default router