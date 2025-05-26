import styles from './index.module.css';
import { Link } from 'react-router-dom';

const RegisterSuccess = () => {
    return (
        <div className={styles.page}>
            <div className={styles.register}>
                <h1>Регистрация прошла успешно!</h1>
                <Link to="/auth" className={styles['go-to-auth']}>
                    Перейти к авторизации
                </Link>
            </div>
        </div>
    );
};

export default RegisterSuccess;
