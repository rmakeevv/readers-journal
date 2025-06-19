import axios from 'axios';
import { AssignedBook, IBook } from 'types';

const baseURL = process.env.REACT_APP_BASE_URL;

export const instance = axios.create({
    baseURL,
});

export const getOneBook = async (id: string) => {
    try {
        const res = await instance.get<IBook>('book/' + id);
        return res.data;
    } catch (e) {
        console.warn(e);
    }
};

export const deleteOneBook = async (id: number) => {
    try {
        await instance.delete('book/' + id);
    } catch (e) {
        console.log(e);
    }
};

export const editOneBook = async (item: IBook) => {
    try {
        await instance.put('book/' + item.id, item);
    } catch (e) {
        console.log(e);
    }
};

export const getChildrenWithBooks = async (userId: number) => {
    try {
        return await instance.get(`users/${userId}/children-with-books`);
    } catch (e) {
        console.log(e);
    }
};

export const getAssignedBooksByChildId = async (userId: number) => {
    try {
        return await instance.get<AssignedBook[]>(
            `users/${userId}/assigned-books`
        );
    } catch (e) {
        console.log(e);
    }
};

export const assignBook = async (
    child_id: number,
    book_id: number,
    parent_id: number
) => {
    try {
        await instance.post('/users/assign', {
            child_id,
            book_id,
            parent_id,
        });
    } catch (e) {
        console.log(e);
    }
};

export const startReadingBook = async (
    child_id: number,
    book_id: number,
    parent_id: number
) => {
    try {
        await instance.post('/users/start-reading', {
            child_id,
            book_id,
            parent_id,
        });
    } catch (e) {
        console.log(e);
    }
};

export const completeReadingBook = async (
    child_id: number,
    book_id: number,
    parent_id: number
) => {
    try {
        await instance.post('/users/complete-reading', {
            child_id,
            book_id,
            parent_id,
        });
    } catch (e) {
        console.log(e);
    }
};

export const fetchChildren = async (parent_id: number) => {
    try {
        const response = await instance.get(
            '/users/' + parent_id + '/children'
        );

        return response.data;
    } catch (e) {
        console.log(e);
    }
};
