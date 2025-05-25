import { Dispatch, SetStateAction } from 'react';
import { ValidateErrorEntity } from 'rc-field-form/es/interface';
import { rolesEnum } from './constants/user';

export interface IBook {
    id: number;
    name: string;
    year: number;
    genre: string;
    author: string;
    instock: number;
}

export type SetBookList = Dispatch<SetStateAction<IBook[]>>;

export type BookList = IBook[] | undefined;

export type OnFinishFailedErrorInfo<T> = ValidateErrorEntity<T>;

export interface DecodedTokenProps {
    email: string;
    userId: number;
    role: rolesEnum;
    iat: number;
    exp: number;
}

export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
}
