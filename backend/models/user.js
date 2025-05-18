import { pool } from '../db.js';

export const User = {
    findOneByEmail: async (email) => {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1;',
            [email]
        );
        return result.rows[0];
    },
    findOneById: async (id) => {
        const result = await pool.query('SELECT * FROM users WHERE id = $1;', [
            id,
        ]);
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
    update: async (id, { name, last_name, role, email, password }) => {
        // Создаем массив для хранения обновляемых полей и их значений
        const updates = [];
        const values = [];
        let paramIndex = 1; // Начинаем с $1 для параметров

        // Добавляем поля в запрос только если они переданы
        if (name !== undefined) {
            updates.push(`name = $${paramIndex}`);
            values.push(name);
            paramIndex++;
        }

        if (last_name !== undefined) {
            updates.push(`last_name = $${paramIndex}`);
            values.push(last_name);
            paramIndex++;
        }

        if (role !== undefined) {
            updates.push(`role = $${paramIndex}`);
            values.push(role);
            paramIndex++;
        }

        if (email !== undefined) {
            updates.push(`email = $${paramIndex}`);
            values.push(email);
            paramIndex++;
        }

        if (password !== undefined) {
            updates.push(`password = $${paramIndex}`);
            values.push(password); // Предполагается, что пароль уже хэширован
            paramIndex++;
        }

        // Если нечего обновлять
        if (updates.length === 0) {
            throw new Error('No fields to update');
        }

        // Добавляем ID в конец массива values
        values.push(id);

        const text = `
        UPDATE users 
        SET ${updates.join(', ')}
        WHERE id = $${paramIndex}
        RETURNING *
    `;

        const query = {
            name: 'update-user',
            text,
            values,
        };

        const result = await pool.query(query);
        return result.rows[0];
    },
};
