import {
    createNote,
    getAllNotes,
    getNoteByParams,
} from '../controllers/notes.js';
import express from 'express';

export const router = express.Router();

router.get('/notes', getAllNotes);
router.get('/notes/:userId/:bookId', getNoteByParams);
router.post('/notes/', createNote);
