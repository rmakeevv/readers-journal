import { useState } from 'react';
import { UseGetAllBooksData, UseLogOut } from '../../hooks';
import { IBook } from '../../types';
import { AdminHeader, ContentWrapper } from '../../components';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const BooksRoute = () => {
    const [bookList, setBookList] = useState<IBook[]>([]);
    const logOut = UseLogOut();

    const onFetchingBooksSuccess = (data: IBook[]) => {
        setBookList(data);
    };

    const { loading, error } = UseGetAllBooksData(onFetchingBooksSuccess);

    if (loading || error) {
        return null;
    }

    return (
        <div>
            <AdminHeader logOut={logOut} />
            <ContentWrapper>
                <div className={styles['content']}>
                    <h1 className={styles['page__title']}>Доступные книги</h1>
                    <div className={styles['book__list']}>
                        {bookList.map((book) => (
                            <Link
                                className={styles['book__item__link']}
                                to={'/books/' + book.id}
                                key={book.id}
                            >
                                <div className={styles['book__item']}>
                                    <span>{book.name}</span> /
                                    <span>{book.author}</span>
                                    <span>{book.year}</span>
                                    <span>{book.genre}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default BooksRoute;
