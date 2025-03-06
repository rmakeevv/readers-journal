import styles from './index.module.css';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { IHeader } from './types';
import { Logo } from 'components';
import { Link } from 'react-router-dom';
import { routesEnum } from '../../../constants/routes';

const LOGOUT_BUTTON_TITLE = 'Выход';

const AdminHeader = ({ logOut }: IHeader) => {
    return (
        <div className={styles.container}>
            <Link to={routesEnum.admin}>
                <Logo size={'small'} />
            </Link>
            <Button onClick={logOut} icon={<PoweroffOutlined />}>
                {LOGOUT_BUTTON_TITLE}
            </Button>
        </div>
    );
};
export default AdminHeader;
