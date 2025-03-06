import express from 'express';
import { userController } from '../controllers/user.js';

export const router = express.Router();

router.get('/users/:id', userController.getOneUser);
