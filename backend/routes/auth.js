import express from 'express';
import { authController } from '../controllers/auth.js';

export const router = express.Router();

router.post('/user/generateToken', authController.generateToken);
router.get('/user/validateToken', authController.validateToken);
router.post('/user/login', authController.login);
router.post('/user/register', authController.register);
