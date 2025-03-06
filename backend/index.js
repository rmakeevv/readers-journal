import express from 'express';
import {
    addNewBook,
    deleteOneBook,
    editOneBook,
    getAllBooks,
    getOneBook,
} from './controllers/index.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const app = express();

dotenv.config();
let PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/book', function (req, res, next) {
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

app.post('/book', addNewBook);
app.delete('/book/:id', deleteOneBook);
app.put('/book/:id', editOneBook);

app.get('/book', getAllBooks);
app.get('/book/:id', getOneBook);

app.post('/user/generateToken', (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
        role: 'admin',
    };

    const token = jwt.sign(data, jwtSecretKey);

    res.send(token);
});

app.post('/user/auth', (req, res) => {
    const { password, username } = req.body;

    if (
        password === process.env.APP_SU_PASSWORD &&
        username === process.env.APP_SU_NAME
    ) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            time: Date(),
            userId: 12,
            role: 'admin',
        };

        const token = jwt.sign(data, jwtSecretKey);

        res.send(token);
    } else {
        res.status(401).send('No pass');
    }
});

app.get('/user/validateToken', (req, res) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.send('Successfully Verified');
        } else {
            return res.status(401).send(error);
        }
    } catch (error) {
        return res.status(401).send(error);
    }
});

try {
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    });
} catch (e) {
    console.log(e);
}
