import { User } from '../models/user.js';

const getOneUser = async (req, res) => {
    try {
        const data = await User.findOneById(req.params.id);
        res.send(data);
    } catch (e) {
        console.warn(e);
        return res.status(500).send('Internal Server Error');
    }
};

export const userController = { getOneUser };
