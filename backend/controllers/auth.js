import jwt from 'jsonwebtoken';

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
};
