import express from 'express';
import { userController } from '../controllers/user.js';

export const router = express.Router();

router.get('/users/:id', userController.getOneUser);

// GET /users/:parentId/children-with-books
router.get(
    '/users/:parentId/children-with-books',
    userController.getChildrenWithBooks
);

// GET /users/:parentId/children
router.get('/users/:parentId/children', userController.getAllChildrenById);

router.post('/users/assign', userController.assignBook);
