import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { router as authRouter } from './routes/auth.js';
import { router as bookRouter } from './routes/book.js';
import { router as userRouter } from './routes/user.js';
import { router as noteRouter } from './routes/notes.js';

const app = express();

dotenv.config();
let PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/', authRouter);
app.use('/', bookRouter);
app.use('/', userRouter);
app.use('/', noteRouter);

try {
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    });
} catch (e) {
    console.log(e);
}
