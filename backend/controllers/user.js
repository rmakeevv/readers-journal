import { pool } from '../db.js';

const getOneUser = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1;', [
            req.params.id,
        ]);
        res.send(result.rows[0]);
    } catch (e) {
        console.warn(e);
        return res.status(500).send('Internal Server Error');
    }
};

export const userController = { getOneUser };
