import styles from './index.module.css';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { IHeader } from './types';
import { Logo } from 'components';
import { Link } from 'react-router-dom';

export default function Header({ logOut }: IHeader) {
    return (
        <div className={styles.container}>
            <Link to={'/'}>
                <Logo size={'small'} />
            </Link>
            <Button onClick={logOut} icon={<PoweroffOutlined />}>
                Выход
            </Button>
        </div>
    );
}
