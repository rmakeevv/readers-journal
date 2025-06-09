import { pool } from '../db.js';
import { ModelHelper } from './index.js';

const BookModel = new ModelHelper('books');

export const Books = {
    getAll: async () => {
        return await BookModel.findAll();
    },
    findById: async (id) => {
        return await BookModel.findOne({ id });
    },
    create: async ({ name, year, genre, author }) => {
        const text = 'INSERT INTO books VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [name, year, genre, author];
        const data = await pool.query(text, values);
        return data.rows;
    },
    delete: async (id) => {
        const text = 'DELETE FROM books WHERE id = $1';
        await pool.query(text, [id]);
    },
    update: async (id, { name, author, year, genre, instock }) => {
        const text =
            'UPDATE books SET name = $1, author = $2, year = $3, genre = $4, instock = $5 WHERE id = $6';
        await pool.query(text, [name, author, year, genre, instock, id]);
    },
};
