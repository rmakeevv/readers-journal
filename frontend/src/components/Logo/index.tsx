import { AliwangwangOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import styles from './index.module.css';

type LogoSize = 'middle' | 'small';

interface LogoProps {
    size: LogoSize;
}
const logoClassName = {
    ['middle']: { icon: 'icon', text: 'text' },
    ['small']: { icon: 'small__icon', text: 'small__text' },
};

const Logo = ({ size = 'small' }: LogoProps) => {
    const sizeStyles = logoClassName[size];

    return (
        <Space>
            <AliwangwangOutlined className={styles[sizeStyles.icon]} />

            <span className={styles[sizeStyles.text]}>booklist</span>
        </Space>
    );
};

export default Logo;
