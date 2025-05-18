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
    login: async (req, res) => {
        try {
            const { password, email } = req.body;

            if (!email || !password) {
                return res.status(401).send('Укажите пароль и логин');
            }

            const user = await User.findOneByEmail(email);

            if (!user) {
                return res.status(401).send('Не найдено, зарегистрируйтесь');
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(401).send('Неверный пароль');
            }

            const jwtSecretKey = process.env.JWT_SECRET_KEY;
            const data = {
                email: user.email,
                userId: user.id,
                role: user.role,
            };

            const token = jwt.sign(data, jwtSecretKey, {
                expiresIn: '2h',
            });

            res.send(token);
        } catch (e) {
            console.warn(e);
            return res.status(401).send(e);
        }
    },
    register: async (req, res) => {
        try {
            const { name, last_name, role, email, password, parent_id } =
                await req.body;
            if (!name || !last_name || !role || !email || !password) {
                return res.status(401).send('Заполните все поля');
            }

            const registeredUser = await User.findOneByEmail(email);

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
                parent_id,
                password: bcrypt.hashSync(password, 8),
            });

            res.send(newUser);
        } catch (e) {
            console.log(e);
            return res.status(401).send(e);
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { userId, newPassword } = req.body;

            if (!userId || !newPassword) {
                return res
                    .status(400)
                    .send('Необходимо указать ID пользователя и новый пароль');
            }

            const updatedUser = await User.update(userId, {
                password: bcrypt.hashSync(newPassword, 8),
            });

            if (!updatedUser) {
                return res.status(404).send('Пользователь не найден');
            }

            res.send({ message: 'Пароль успешно изменен' });
        } catch (e) {
            console.log(e);
            return res.status(500).send('Ошибка при изменении пароля');
        }
    },
};
