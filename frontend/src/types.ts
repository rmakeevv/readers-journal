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

export type OnFinishFailedErrorInfo<T> = ValidateErrorEntity<T>;

export interface DecodedTokenProps {
    email: string;
    userId: number;
    role: rolesEnum;
    parent_id: number | null;
    iat: number;
    exp: number;
}

export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
}

export interface AssignedBook {
    /** Уникальный идентификатор книги */
    id: number;

    /** Название книги */
    name: string;

    /** Год издания */
    year: number;

    /** Жанр */
    genre: string;

    /** Автор */
    author: string;

    /** Количество в наличии (null - нет данных) */
    instock: number;

    /** Статус книги для ребенка */
    status: BookStatus;
}

/** Возможные статусы книги */
type BookStatus = 'assigned' | 'reading' | 'completed';

// Соответствие английских и русских статусов
const StatusTranslations: Record<BookStatus, string> = {
    assigned: 'Назначена родителем',
    reading: 'Уже читаю',
    completed: 'Прочитана',
};

// Функция для получения русского статуса
export function getRussianBookStatus(status: BookStatus): string {
    return StatusTranslations[status];
}
