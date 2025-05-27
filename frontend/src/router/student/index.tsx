import { AdminHeader } from '../../components';
import { UseLogOut } from '../../hooks';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { IBook } from '../../types';
import { useEffect, useState } from 'react';
import { getAssignedBooksByChildId } from '../../services';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../store/user/slice';

const StudentRoute = () => {
    const [assignedBooks, setAssignedBooks] = useState<IBook[]>([]);
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
                <div className="table-container">
                    <h2>Я читаю книги</h2>
                    <table className={styles['assigned-books-table']}>
                        <thead>
                            <tr>
                                <th align={'left'}>Название книги</th>
                                <th>Год</th>
                                <th align={'left'}>Жанр</th>
                                <th>Автор</th>
                                <th align={'left'}>Ссылка</th>
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
