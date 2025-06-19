import { ModelHelper } from './index.js';
import { pool } from '../db.js';

const NoteModel = new ModelHelper('notes');

export const Notes = {
    findAll: async () => {
        return await NoteModel.findAll();
    },
    findByParams: async (userId, bookId) => {
        try {
            const result = await pool.query(
                `
                    SELECT *
                    FROM notes
                    WHERE user_id = $1 AND book_id = $2
                `,
                [userId, bookId]
            );

            return result.rows;
        } catch (e) {
            throw new Error(`Error fetching notes: ${e.message}`);
        }
    },
    create: async (userId, bookId, text) => {
        try {
            const result = await pool.query(
                `
                    INSERT INTO
                    notes(id, book_id, user_id, text) VALUES($1, $2, $3, $4) RETURNING *
                `,
                [bookId + userId, bookId, userId, text]
            );

            return result.rows;
        } catch (e) {
            throw new Error(`Error fetching notes: ${e.message}`);
        }
    },
};
