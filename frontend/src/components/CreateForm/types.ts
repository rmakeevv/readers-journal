import { IBook, OnFinishFailedErrorInfo } from 'types';

export type FieldType = {
    name?: string;
    year?: string;
    genre?: string;
    author?: string;
};

export interface CreateFormProps {
    onFinish: (values: IBook) => void;
    onFinishFailed: (errorInfo: OnFinishFailedErrorInfo<IBook>) => void;
}
