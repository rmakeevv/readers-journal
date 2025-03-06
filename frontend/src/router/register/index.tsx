import React from 'react';
import { Logo, RegisterForm } from '../../components';
import { OnFinishFailedErrorInfo } from '../../types';
import styles from './index.module.css';
import { Flex } from 'antd';
import { useSubmitRegisterForm } from '../../hooks/UseSubmitRegisterForm';

type FieldType = {
    email?: string;
    name?: string;
    lastName?: string;
    password?: string;
    confirm?: string;
    agreement?: boolean;
};

const onFinishFailed = (errorInfo: OnFinishFailedErrorInfo<FieldType>) => {
    console.log('Failed:', errorInfo);
};

const Register = () => {
    const { onFinish, isError } = useSubmitRegisterForm();

    return (
        <div className={styles.page}>
            <div className={styles['register']}>
                <Flex justify={'center'} gap={'small'}>
                    <Logo size={'middle'} />
                    <h1>Регистрация</h1>
                </Flex>

                <RegisterForm
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                />
                {isError && (
                    <span className={styles.error}>
                        Пароль и(или) логин неверный!
                    </span>
                )}
            </div>
        </div>
    );
};

export default Register;
