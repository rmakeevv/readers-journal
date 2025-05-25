import { Form, FormInstance } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';
import { editOneBook } from 'services';
import { IBook, SetBookList } from 'types';

type UseSaveRowType = (
    setBookList: SetBookList,
    setEditingKey: Dispatch<SetStateAction<string>>,
    bookList: IBook[]
) => { save: (key: React.Key) => Promise<void>; form: FormInstance };

const UseSaveRow: UseSaveRowType = (setBookList, setEditingKey, bookList) => {
    const [form] = Form.useForm();
    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as IBook;
            const newData = bookList?.length ? [...bookList] : [];
            const index = newData.findIndex((item) => key === item.id);
            if (index > -1) {
                const item = newData[index];
                const newItem = { ...item, ...row };
                await editOneBook(newItem);

                newData.splice(index, 1, newItem);
                setBookList(newData);

                setEditingKey('');
            } else {
                newData.push(row);
                setBookList(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    return { save, form };
};

export default UseSaveRow;
