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

        // Проверка наличия токена
        const token = req.header(tokenHeaderKey);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.',
            });
        }

        try {
            // Верификация токена
            const verified = jwt.verify(token, jwtSecretKey);

            // Можно добавить дополнительную проверку verified, если нужно
            return res.json({
                success: true,
                message: 'Token successfully verified',
                user: verified, // опционально - возвращаем декодированные данные
            });
        } catch (error) {
            // Логирование ошибки для сервера
            console.error('Token verification error:', error);

            // Разные сообщения для разных типов ошибок
            let errorMessage = 'Invalid token';
            if (error instanceof jwt.TokenExpiredError) {
                errorMessage = 'Token expired';
            } else if (error instanceof jwt.JsonWebTokenError) {
                errorMessage = 'Invalid token';
            }

            return res.status(401).json({
                success: false,
                message: errorMessage,
            });
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
                parent_id: user.parent_id,
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
