import express from 'express';
import {
    addNewBook,
    deleteOneBook,
    editOneBook,
    getAllBooks,
    getOneBook,
} from '../controllers/book.js';
import jwt from 'jsonwebtoken';

export const router = express.Router();

// защита авторизацией всегда перед всеми обработчиками

router.use('/book', function (req, res, next) {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return next();
        } else {
            return res.status(401).send(error);
        }
    } catch (error) {
        return res.status(401).send(error);
    }
});

router.post('/book', addNewBook);
router.delete('/book/:id', deleteOneBook);
router.put('/book/:id', editOneBook);
router.get('/book', getAllBooks);
router.get('/book/:id', getOneBook);
