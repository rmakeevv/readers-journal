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

const getChildrenWithBooks = async (req, res) => {
    try {
        const parentId = req.params.parentId;
        const children = await User.getChildrenWithAssignedBooks(parentId);

        res.json({
            success: true,
            data: children,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllChildrenById = async (req, res) => {
    try {
        const parentId = req.params.parentId; // или req.user.id если используете аутентификацию
        const children = await User.getAllChildrenByParentId(parentId);

        res.send(children);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const assignBook = async (req, res) => {
    try {
        const { child_id, book_id, parent_id } = await req.body;
        const result = await User.assignBook(parent_id, child_id, book_id);

        res.send(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const startReadingBook = async (req, res) => {
    try {
        const { child_id, book_id, parent_id } = await req.body;
        const result = await User.startReadingBook(
            parent_id,
            child_id,
            book_id
        );

        res.send(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAssignedBooksByChildId = async (req, res) => {
    try {
        const child_id = await req.params.childId;
        const result = await User.getAssignedBooksByChildId(child_id);

        res.send(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const userController = {
    getOneUser,
    getChildrenWithBooks,
    getAllChildrenById,
    getAssignedBooksByChildId,
    assignBook,
    startReadingBook,
};
