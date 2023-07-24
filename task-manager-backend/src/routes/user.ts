// Dependencies
import express, { Router } from 'express';
const router: Router = express.Router();

// Controller
import * as userCtrl from '../controllers/user';

// Routes
router.get('/user/detail', userCtrl.user_detail_get);
router.get('/user/index', userCtrl.user_index_get);

export default router