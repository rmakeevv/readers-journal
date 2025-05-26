import { AdminHeader } from '../../components';
import { UseLogOut } from '../../hooks';
import styles from './index.module.css';

const StudentRoute = () => {
    const logOut = UseLogOut();

    return (
        <div>
            <AdminHeader logOut={logOut} />
            <div style={{ marginTop: '80px' }}>
                <h1 className={styles['student-page__title']}>
                    Страница ученика
                </h1>
            </div>
        </div>
    );
};

export default StudentRoute;
