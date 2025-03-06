import { Books } from '../models/books.js';

export const getAllBooks = async (req, res) => {
    try {
        const data = await Books.getAll();
        res.send(data);
    } catch (e) {
        console.warn(e);
        return res.status(500).send('Internal Server Error');
    }
};

export const getOneBook = async (req, res) => {
    try {
        const data = await Books.findById(req.params.id);
        res.send(data);
    } catch (e) {
        console.warn(e);
        return res.status(500).send('Internal Server Error');
    }
};

export const addNewBook = async (req, res) => {
    try {
        const { name, year, genre, author } = await req.body;
        const data = await Books.create({ name, year, genre, author });
        res.send(data);
    } catch (e) {
        console.warn(e.message);
        return res.status(500).send('Internal Server Error');
    }
};

export const deleteOneBook = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await Books.delete(id);
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
        await Books.update(id, { name, year, genre, author, instock });
        res.sendStatus(200);
    } catch (e) {
        console.warn(e.message);
        return res.status(500).send('Internal Server Error');
    }
};
