// Dependencies
import express, { Router } from 'express';
const router: Router = express.Router();

// Controller
import * as taskCtrl from '../controllers/task';

// Routes
router.post('/task/add', taskCtrl.task_create_post);
router.get('/task/index', taskCtrl.task_index_get);
router.get('/task/user/index', taskCtrl.task_user_index_get);
router.post('/task/edit', taskCtrl.task_edit_post);
router.post('/task/delete', taskCtrl.task_delete_post);

export default router;