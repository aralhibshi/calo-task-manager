// Dependencies
import express, { Router } from 'express';
const router: Router = express.Router();

// Controller
import * as taskCtrl from '../controllers/task';

// Routes
router.post('/task/add', taskCtrl.task_create_post)
router.get('/task/index', taskCtrl.task_index_get)

export default router;