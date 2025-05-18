import axios from 'axios';
import { IBook } from 'types';

const baseURL = process.env.REACT_APP_BASE_URL;

export const instance = axios.create({
    baseURL,
});

export const getAllBooks = async () => {
    try {
        const res = await instance.get<IBook[]>('book');
        return res.data;
    } catch (e) {
        console.warn(e);
    }
};

export const getOneBook = async (id: string) => {
    try {
        const res = await instance.get<IBook[]>('book/' + id);
        return res.data;
    } catch (e) {
        console.warn(e);
    }
};

export const createOneBook = async (values: IBook) => {
    try {
        const res = await instance.post<IBook>('book', values);
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
