import { Notes } from '../models/notes.js';

export const getAllNotes = async (req, res) => {
    try {
        const data = await Notes.findAll();
        res.send(data);
    } catch (e) {
        console.warn(e);
        return res.status(500).send('Internal Server Error');
    }
};

export const getNoteByParams = async (req, res) => {
    try {
        const { userId, bookId } = req.params;
        const data = await Notes.findByParams(userId, bookId);
        res.send(data);
    } catch (e) {
        console.warn(e);
        return res.status(500).send('Internal Server Error');
    }
};

export const createNote = async (req, res) => {
    try {
        const { userId, bookId, text } = req.body;
        const data = await Notes.create(userId, bookId, text);
        res.send(data);
    } catch (e) {
        console.warn(e);
        return res.status(500).send('Internal Server Error');
    }
};
