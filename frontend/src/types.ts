import { Dispatch, SetStateAction } from 'react';
import { ValidateErrorEntity } from 'rc-field-form/es/interface';

export interface IBook {
    id: number;
    name: string;
    year: number;
    genre: string;
    author: string;
    instock: number;
}

export type SetBookList = Dispatch<SetStateAction<IBook[] | undefined>>;

export type BookList = IBook[] | undefined;

export type OnFinishFailedErrorInfo<T> = ValidateErrorEntity<T>;
