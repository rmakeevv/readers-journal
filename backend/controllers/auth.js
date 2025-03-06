import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';

export const authController = {
    generateToken: (req, res) => {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            time: Date(),
            userId: 12,
            role: 'admin',
        };

        const token = jwt.sign(data, jwtSecretKey);

        res.send(token);
    },
    validateToken: (req, res) => {
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
    },
    login: (req, res) => {
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
    },
    register: async (req, res) => {
        try {
            const { name, last_name, role, email, password } = await req.body;
            if (!name || !last_name || !role || !email || !password) {
                return res.send(401, 'Заполните все поля');
            }

            const registeredUser = await User.getOneByEmail(email);

            if (registeredUser) {
                return res.status(403).send({
                    error: 'A user account already exists with this email',
                });
            }

            const newUser = await User.create({
                name,
                last_name,
                role,
                email,
                password: bcrypt.hashSync(password, 8),
            });

            res.send(newUser);
        } catch (e) {
            console.log(e);
            return res.status(401).send(e);
        }
    },
};
