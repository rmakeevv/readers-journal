import { IBook } from 'types';

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: 'number' | 'text';
    record: IBook;
    index: number;
    children: React.ReactNode;
}
