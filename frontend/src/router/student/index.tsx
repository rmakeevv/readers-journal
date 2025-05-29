import { AdminHeader } from '../../components';
import { UseLogOut } from '../../hooks';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { AssignedBook, getRussianBookStatus } from '../../types';
import { useEffect, useState } from 'react';
import { getAssignedBooksByChildId } from '../../services';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../store/user/slice';
import ReadingProgressBar from '../../components/ReadingProgressBar';

const StudentRoute = () => {
    const [assignedBooks, setAssignedBooks] = useState<AssignedBook[]>([]);
    const userId = useSelector(selectUserId);

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                const res = await getAssignedBooksByChildId(userId);
                res?.data && setAssignedBooks(res.data);
            }
        };
        fetchData();
    }, []);

    const logOut = UseLogOut();

    return (
        <div>
            <AdminHeader logOut={logOut} />
            <div style={{ marginTop: '80px' }}>
                <h1 className={styles['student-page__title']}>
                    Страница ученика
                </h1>
            </div>
            <div>
                <ReadingProgressBar books={assignedBooks} />
            </div>
            <div>
                <div className="table-container">
                    <h2>Мои книги</h2>
                    <table className={styles['assigned-books-table']}>
                        <thead>
                            <tr>
                                <th align={'left'}>Название книги</th>
                                <th>Год</th>
                                <th align={'left'}>Жанр</th>
                                <th>Автор</th>
                                <th align={'left'}>Ссылка</th>
                                <th align={'left'}>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignedBooks.map((book, index) => (
                                <tr
                                    key={book.id}
                                    style={{
                                        background: index % 2 ? '#F2F2F2' : '',
                                    }}
                                >
                                    <td>{book.name}</td>
                                    <td>{book.year}</td>
                                    <td>{book.genre}</td>
                                    <td align={'left'}>{book.author}</td>
                                    <td>
                                        <Link to={'/books/' + book.id}>
                                            На страницу книги
                                        </Link>
                                    </td>
                                    <td align={'left'}>
                                        {getRussianBookStatus(book.status)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentRoute;
