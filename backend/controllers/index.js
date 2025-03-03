import { pool } from '../db.js';

export const getAllBooks = async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM books ORDER BY id DESC;');
        res.send(data.rows);
    } catch (e) {
        console.warn(e);
        return res.status(500).send('Internal Server Error');
    }
};

export const getOneBook = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books WHERE id = $1;', [
            req.params.id,
        ]);
        res.send(result.rows[0]);
    } catch (e) {
        console.warn(e);
        return res.status(500).send('Internal Server Error');
    }
};

export const addNewBook = async (req, res) => {
    try {
        const { name, year, genre, author } = await req.body;
        const text = 'INSERT INTO books VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [name, year, genre, author];
        const result = await pool.query(text, values);
        res.send(result.rows[0]);
    } catch (e) {
        console.warn(e.message);
        return res.status(500).send('Internal Server Error');
    }
};

export const deleteOneBook = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const text = 'DELETE FROM books WHERE id = $1';
        await pool.query(text, [id]);
        res.sendStatus(200);
    } catch (e) {
        console.warn(e.message);
        return res.status(500).send('Internal Server Error');
    }
};

export const editOneBook = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, year, genre, author, instock } = req.body;
        const text =
            'UPDATE books SET name = $1, author = $2, year = $3, genre = $4, instock = $5 WHERE id = $6';
        await pool.query(text, [name, author, year, genre, instock, id]);
        res.sendStatus(200);
    } catch (e) {
        console.warn(e.message);
        return res.status(500).send('Internal Server Error');
    }
};
