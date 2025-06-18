import styles from './index.module.css';
import { UseAuthForm } from 'hooks';
import { AuthForm, Logo } from 'components';
import { OnFinishFailedErrorInfo } from '../../types';
import { ConfigProvider, Divider, theme } from 'antd';
import { useState } from 'react';

type FieldType = {
    email?: string;
    password?: string;
    remember?: boolean;
};

const onFinishFailed = (errorInfo: OnFinishFailedErrorInfo<FieldType>) => {
    console.log('Failed:', errorInfo);
};

const LOGIN_DATA_INCORRECT_MESSAGE = 'Пароль и(или) логин неверный!';
const FORGOT_PASSWORD_MESSAGE =
    'Забыли пароль? Напишите администратору на почту';

function Auth() {
    const { onFinish, isError } = UseAuthForm();
    const [isDark, setIsDark] = useState(false);

    return (
        <ConfigProvider
            theme={{
                algorithm: isDark
                    ? theme.darkAlgorithm
                    : theme.defaultAlgorithm,
            }}
        >
            <div className={`${styles.page} ${isDark ? styles.dark : ''}`}>
                <div className={styles['auth-container']}>
                    <Logo size={'middle'} />
                    <AuthForm
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    />
                    {isError && (
                        <span className={styles.error}>
                            {LOGIN_DATA_INCORRECT_MESSAGE}
                        </span>
                    )}
                    <Divider />
                    <span>
                        {FORGOT_PASSWORD_MESSAGE} <br />
                        <a href={'mailto:example@mail.com'}>example@mail.com</a>
                    </span>
                </div>
            </div>
        </ConfigProvider>
    );
}

export default Auth;
