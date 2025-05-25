import { IBook } from '../types';
import { instance } from './index';

export const BookService = {
    createOne: async (data: IBook) => {
        try {
            const res = await instance.post<IBook[]>('book', data);
            return res.data[0];
        } catch (e) {
            console.warn(e);
        }
    },
    getAll: async () => {
        try {
            const res = await instance.get<IBook[]>('book');
            return res.data;
        } catch (e) {
            console.warn(e);
        }
    },
};
