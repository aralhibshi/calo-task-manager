// Dependencies
import express, { Router } from 'express';
const router: Router = express.Router();

// Controller
import * as authCtrl from '../controllers/auth';

// Routes
router.post('/auth/signup', authCtrl.auth_signup_post);

export default router;