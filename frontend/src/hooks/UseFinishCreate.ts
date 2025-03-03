import { createOneBook } from 'services';
import { IBook, SetBookList } from 'types';

type UseFinishCreateType = (
    setBookList: SetBookList,
    showSuccessMessage: (message: string) => void
) => (item: IBook) => Promise<void>;

const UseFinishCreate: UseFinishCreateType = (
    setBookList,
    showSuccessMessage
) => {
    return async (values: IBook) => {
        const data = await createOneBook(values);

        data &&
            setBookList((prevState) => {
                if (prevState) {
                    showSuccessMessage('Запись успешно добавлена!');
                    return [data, ...prevState];
                }
                return [data];
            });
    };
};

export default UseFinishCreate;
