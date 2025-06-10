import { useEffect, useState } from 'react';
import { ContentWrapper, AdminHeader } from '../../../components';
import { UseLogOut } from '../../../hooks';
import {
    getAssignedBooksByChildId,
    getOneBook,
    instance,
} from '../../../services';
import { useParams } from 'react-router-dom';
import {
    AssignedBook,
    BookStatus,
    getRussianBookStatus,
    IBook,
    User,
} from '../../../types';
import { Button, Descriptions, DescriptionsProps } from 'antd';
import styles from './index.module.css';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../store/user/slice';
import { rolesEnum } from '../../../constants/user';

enum BookDescriptionLabels {
    id = 'id',
    name = 'Название',
    year = 'Год',
    genre = 'жанр',
    author = 'автор',
    instock = 'в наличии',
}

const getDescriptionItems = (book: IBook) => {
    const bookItems = Object.entries(book);

    const itemsTest: DescriptionsProps['items'] = bookItems.map((item) => {
        const [key, value] = item;

        return {
            key,
            label: BookDescriptionLabels[key as keyof IBook],
            children: <span>{value || '-'}</span>,
        };
    });

    return itemsTest;
};

const Book = () => {
    const logOut = UseLogOut();
    const { id = '' } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [bookData, setBookData] = useState<IBook | undefined>(undefined);
    const [children, setChildren] = useState<User[]>([]);
    const [selectedChild, setSelectedChild] = useState<string>();
    const { id: userId, role, parent_id } = useSelector(selectUserData);
    const [assignedId, setAssignedId] = useState('');
    const [isBookAssigned, setIsBookAssigned] = useState(false);
    const [bookStatus, setBookStatus] = useState<BookStatus | null>();

    useEffect(() => {
        if (role !== rolesEnum.student) {
            return;
        }

        const fetchData = async () => {
            if (userId) {
                const res = await getAssignedBooksByChildId(userId);
                if (res && res.data) {
                    const assignedBooks: AssignedBook[] = res.data;
                    const assignedBook = assignedBooks.find(
                        (book: AssignedBook) => book.id === Number(id)
                    );
                    setIsBookAssigned(!!assignedBook);
                    setBookStatus(assignedBook?.status);
                }
            }
        };
        fetchData().catch((e) => console.log(e));
    }, [userId, role]);

    useEffect(() => {
        if (role === rolesEnum.parent) {
            const fetchChildren = async () => {
                const children = await instance.get(
                    '/users/' + userId + '/children'
                );
                setChildren(children.data);

                if (children.data.length > 0) {
                    setSelectedChild(children.data[0].id.toString());
                }
            };
            fetchChildren().then();
        }
    }, [userId]);

    useEffect(() => {
        setIsLoading(true);
        getOneBook(id)
            .then((data) => {
                if (data !== undefined) {
                    setBookData(data[0]);
                }
            })
            .catch((e) => console.log(e))
            .finally(() => setIsLoading(false));
    }, []);

    const handleAssignBook = async () => {
        if (selectedChild) {
            console.log(`Книга назначена ребенку с ID: ${selectedChild}`);

            const assignBook = async () => {
                await instance.post('/users/assign', {
                    child_id: selectedChild,
                    book_id: id,
                    parent_id: userId,
                });
                setAssignedId(selectedChild);
            };

            await assignBook();
        }
    };

    const handleStartReadingBookButtonClick = async () => {
        const startReadingBook = async () => {
            await instance.post('/users/start-reading', {
                child_id: userId,
                book_id: id,
                parent_id: parent_id,
            });

            setIsBookAssigned(true);
        };

        await startReadingBook();
    };

    return (
        <div>
            <AdminHeader logOut={logOut} />
            {isLoading || bookData === undefined ? (
                <></>
            ) : (
                <ContentWrapper>
                    {role === rolesEnum.parent && (
                        <div className={styles['assign_book']}>
                            <span>Назначить ребенку</span>
                            <span>Выберите имя</span>
                            <select
                                value={selectedChild}
                                onChange={(e) =>
                                    setSelectedChild(e.target.value)
                                }
                            >
                                {children.map((child) => (
                                    <option key={child.id} value={child.id}>
                                        {child.email} {child.name}
                                    </option>
                                ))}
                            </select>
                            <Button
                                disabled={assignedId === selectedChild}
                                onClick={handleAssignBook}
                            >
                                Назначить книгу
                            </Button>
                        </div>
                    )}

                    <div className={styles.container}>
                        <Descriptions
                            title={'Страница книги: ' + bookData.name}
                            items={getDescriptionItems(bookData)}
                            layout="vertical"
                            bordered
                        />
                        {role === rolesEnum.student && (
                            <div className={styles['book__status__container']}>
                                <Button
                                    disabled={isBookAssigned}
                                    onClick={handleStartReadingBookButtonClick}
                                >
                                    Начать читать книгу
                                </Button>
                                <div>
                                    Статус:
                                    {(bookStatus &&
                                        getRussianBookStatus(bookStatus)) ||
                                        'Не назначена'}
                                </div>
                            </div>
                        )}
                    </div>
                </ContentWrapper>
            )}
        </div>
    );
};

export default Book;
