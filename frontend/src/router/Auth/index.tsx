import styles from './index.module.css';
import { UseAuthForm } from 'hooks';
import { AuthForm, Logo } from 'components';
import { OnFinishFailedErrorInfo } from '../../types';
import { Divider } from 'antd';

type FieldType = {
    email?: string;
    password?: string;
    remember?: boolean;
};

const onFinishFailed = (errorInfo: OnFinishFailedErrorInfo<FieldType>) => {
    console.log('Failed:', errorInfo);
};

function Auth() {
    const { onFinish, isError } = UseAuthForm();

    return (
        <div className={styles.page}>
            <div className={styles['auth-container']}>
                <Logo size={'middle'} />
                <AuthForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
                {isError && (
                    <span className={styles.error}>
                        Пароль и(или) логин неверный!
                    </span>
                )}
                <Divider />
                <span>
                    Забыли пароль? Напишите администратору на почту <br />
                    <a href={'mailto:example@mail.com'}>example@mail.com</a>
                </span>
            </div>
        </div>
    );
}

export default Auth;
