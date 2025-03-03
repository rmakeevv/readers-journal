import styles from './index.module.css';
import { UseAuthForm } from 'hooks';
import { AuthForm, Logo } from 'components';
import { OnFinishFailedErrorInfo } from '../../types';

type FieldType = {
    username?: string;
    password?: string;
};

const onFinishFailed = (errorInfo: OnFinishFailedErrorInfo<FieldType>) => {
    console.log('Failed:', errorInfo);
};

function Auth() {
    const { onFinish, isError } = UseAuthForm();

    return (
        <div className={styles.page}>
            <div>
                <Logo size={'middle'} />
                <AuthForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
                {isError && (
                    <span className={styles.error}>
                        Пароль и(или) логин неверный!
                    </span>
                )}
            </div>
        </div>
    );
}

export default Auth;
