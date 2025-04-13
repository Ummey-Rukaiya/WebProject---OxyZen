import express from 'express';
import {
  createReminder,
  getReminders,
  updateReminder,
  deleteReminder
} from '../controllers/reminderController.js';

//import { authMiddleware } from '../middlewares/authMiddleware.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

router.use(userAuth);

router.post('/create', userAuth, createReminder);
router.get('/', userAuth, getReminders);
router.put('/:id', userAuth, updateReminder);
router.delete('/:id', userAuth, deleteReminder);

export default router;
