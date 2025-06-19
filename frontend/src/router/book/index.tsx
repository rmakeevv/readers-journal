import { useEffect, useState } from 'react';
import { AdminHeader, ContentWrapper } from '../../components';
import { UseLogOut } from '../../hooks';
import {
    assignBook,
    completeReadingBook,
    fetchChildren,
    getAssignedBooksByChildId,
    getOneBook,
    instance,
    startReadingBook,
} from '../../services';
import { useParams } from 'react-router-dom';
import { BookStatus, IBook, User } from '../../types';
import { Button, Descriptions, DescriptionsProps } from 'antd';
import styles from './index.module.css';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../store/user/slice';
import { rolesEnum } from '../../constants/user';
import NoteForm from '../../components/NoteForm';

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

    const items: DescriptionsProps['items'] = bookItems.map((item) => {
        const [key, value] = item;

        return {
            key,
            label: BookDescriptionLabels[key as keyof IBook],
            children: <span>{value || '-'}</span>,
        };
    });

    return items;
};

const fetchAssignedBooksByChildId = async (child_id: number) => {
    const res = await getAssignedBooksByChildId(child_id);
    if (res && res.data && Array.isArray(res.data)) {
        return res.data;
    }

    return null;
};

const Book = () => {
    const logOut = UseLogOut();
    const { id = '' } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [bookData, setBookData] = useState<IBook | undefined>(undefined);
    const [children, setChildren] = useState<User[]>([]);
    const [selectedChildId, setSelectedChildId] = useState<number>();
    const { id: userId, role, parent_id } = useSelector(selectUserData);
    const [childIdWithBookAssigned, setChildIdWithBookAssigned] =
        useState<number>();
    const [noteText, setNoteText] = useState('');
    const [childAssignedBookStatus, setChildAssignedBookStatus] =
        useState<BookStatus>();

    useEffect(() => {
        if (role === rolesEnum.admin) {
            return;
        }

        if (userId && role === rolesEnum.student) {
            fetchAssignedBooksByChildId(userId)
                .then((assignedBooks) => {
                    if (assignedBooks) {
                        const assignedBook = assignedBooks.find(
                            (book) => book.id === Number(id)
                        );

                        if (assignedBook) {
                            setChildAssignedBookStatus(assignedBook.status);
                        }
                    }
                })
                .catch((e) => console.log(e));
            return;
        }

        if (userId && role === rolesEnum.parent && selectedChildId) {
            fetchAssignedBooksByChildId(selectedChildId)
                .then((books) => {
                    if (books) {
                        const assignedBook = books.find(
                            (book) => book.id === Number(id)
                        );
                        if (assignedBook) {
                            setChildIdWithBookAssigned(selectedChildId);
                        }
                    }
                })
                .catch((e) => console.log(e));
            return;
        }
    }, [userId, role, selectedChildId]);

    useEffect(() => {
        if (role !== rolesEnum.parent || !userId) {
            return;
        }
        fetchChildren(userId).then((data) => {
            setChildren(data);

            if (data.length > 0) {
                setSelectedChildId(data[0].id);
            }
        });
    }, [userId]);

    useEffect(() => {
        setIsLoading(true);
        getOneBook(id)
            .then((data) => {
                if (data !== undefined) {
                    setBookData(data);
                }
            })
            .catch((e) => console.log(e))
            .finally(() => setIsLoading(false));
    }, []);

    const handleAssignBook = async () => {
        if (selectedChildId && userId) {
            try {
                await assignBook(selectedChildId, Number(id), userId);
                setChildIdWithBookAssigned(selectedChildId);

                console.log(`Книга назначена ребенку с ID: ${selectedChildId}`);
            } catch (e) {
                console.log(e);
            }
        }
    };

    const handleStartReadingBookButtonClick = async () => {
        if (userId && parent_id) {
            await startReadingBook(userId, Number(id), parent_id);
            setChildAssignedBookStatus('reading');
        }
    };

    const handleCompleteReadingBookButtonClick = async () => {
        if (userId && parent_id) {
            await completeReadingBook(userId, Number(id), parent_id);
            setChildAssignedBookStatus('completed');
        }
    };

    useEffect(() => {
        if (role !== rolesEnum.student) {
            return;
        }

        const getNote = async () => {
            try {
                const response = await instance.get(
                    '/notes/' + userId + '/' + id
                );
                const { data } = response;

                if (
                    Array.isArray(data) &&
                    data.length &&
                    data[data.length - 1].text
                ) {
                    setNoteText(data[data.length - 1].text);
                }
            } catch (e) {
                console.log(e);
            }
        };

        getNote();
    }, [role, userId]);

    return (
        <div>
            <AdminHeader logOut={logOut} />
            {isLoading || bookData === undefined ? (
                <></>
            ) : (
                <ContentWrapper>
                    <div className={styles['content__responsive']}>
                        {role === rolesEnum.parent && (
                            <div className={styles['assign_book__container']}>
                                <h2 className={styles['assign_book__title']}>
                                    Назначить ребенку
                                </h2>
                                <span>Выберите имя</span>
                                <select
                                    value={selectedChildId}
                                    onChange={(e) =>
                                        setSelectedChildId(
                                            Number(e.target.value)
                                        )
                                    }
                                >
                                    {children.map((child) => (
                                        <option key={child.id} value={child.id}>
                                            {child.email} {child.name}
                                        </option>
                                    ))}
                                </select>
                                <Button
                                    disabled={
                                        childIdWithBookAssigned ===
                                        selectedChildId
                                    }
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
                                <div className={styles['child__panel']}>
                                    <div
                                        className={
                                            styles['book__status__container']
                                        }
                                    >
                                        <Button
                                            disabled={
                                                childAssignedBookStatus ===
                                                'reading'
                                            }
                                            onClick={
                                                handleStartReadingBookButtonClick
                                            }
                                        >
                                            Начать читать книгу
                                        </Button>
                                        <Button
                                            disabled={
                                                !childAssignedBookStatus ||
                                                childAssignedBookStatus ===
                                                    'completed'
                                            }
                                            onClick={
                                                handleCompleteReadingBookButtonClick
                                            }
                                        >
                                            Завершить
                                        </Button>
                                    </div>
                                    <div className={styles['note__container']}>
                                        <NoteForm
                                            bookId={Number(id)}
                                            noteText={noteText}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </ContentWrapper>
            )}
        </div>
    );
};

export default Book;
