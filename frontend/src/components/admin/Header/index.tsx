import styles from './index.module.css';
import { Button } from 'antd';
import { IHeader } from './types';
import { Logo } from 'components';
import { Link } from 'react-router-dom';
import { routesEnum } from '../../../constants/routes';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../store/user/slice';
import { rolesEnum } from '../../../constants/user';

const LOGOUT_BUTTON_TITLE = 'Выход';

const AdminHeader = ({ logOut }: IHeader) => {
    const { email, role } = useSelector(selectUserData);
    const getLinkToProfile = (role: rolesEnum | null) => {
        switch (role) {
            case rolesEnum.parent: {
                return routesEnum.profile + '/' + routesEnum.parent;
            }
            case rolesEnum.student: {
                return routesEnum.profile + '/' + routesEnum.student;
            }
            default:
                return routesEnum.admin;
        }
    };

    return (
        <div className={styles.container}>
            <Link to={getLinkToProfile(role)}>
                <Logo size={'small'} />
            </Link>
            <div className={styles.navbar}>
                <Link className={styles['link_to_profile']} to={'/books'}>
                    Доступные книги
                </Link>
                <Link
                    className={styles['link_to_profile']}
                    to={getLinkToProfile(role)}
                >
                    Профиль:
                </Link>
                <span className={styles['user__email']}>{email}</span>

                <Button onClick={logOut}>{LOGOUT_BUTTON_TITLE}</Button>
            </div>
        </div>
    );
};
export default AdminHeader;
