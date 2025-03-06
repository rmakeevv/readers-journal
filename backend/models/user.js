import { pool } from '../db.js';

export const User = {
    getOneByEmail: async (email) => {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1;',
            [email]
        );
        return result.rows[0];
    },
    create: async ({ name, last_name, role, email, password }) => {
        const text =
            'INSERT INTO users(name, last_name, role, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *';
        const values = [name, last_name, role, email, password];

        const query = {
            name: 'register',
            text,
            values,
        };

        const result = await pool.query(query);
        return result.rows[0];
    },
};
