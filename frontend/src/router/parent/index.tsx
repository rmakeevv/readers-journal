import React, { useEffect, useState } from 'react';
import { getChildrenWithBooks } from '../../services';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../store/user/slice';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { AdminHeader, Logo } from '../../components';
import { UseLogOut } from '../../hooks';
import { Button, Flex, Form, Input } from 'antd';
import { useSubmitRegisterForm } from '../../hooks/UseSubmitRegisterForm';
import { OnFinishFailedErrorInfo } from '../../types';
import { rolesEnum } from '../../constants/user';

type BookStatus = 'assigned' | 'read' | 'completed' | 'archived'; // и т.д.

interface AssignedBook {
    id: number;
    name: string;
    author: string;
    status: BookStatus;
}

interface ChildData {
    id: number;
    name: string;
    last_name: string;
    email: string;
    assignedBooks: AssignedBook[];
}

type FieldType = {
    email?: string;
    name?: string;
    lastName?: string;
    password?: string;
    confirm?: string;
};

const onFinishFailed = (errorInfo: OnFinishFailedErrorInfo<FieldType>) => {
    console.log('Failed:', errorInfo);
};

const ParentRoute = () => {
    const id = useSelector(selectUserId);
    const [childrenData, setChildrenData] = useState<ChildData[] | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFormShown, setIsFormShown] = useState(true);
    const logOut = UseLogOut();
    const { onFinish, isError } = useSubmitRegisterForm(
        () => {
            setIsSuccess(true);
            setIsFormShown(false);
        },
        rolesEnum.student,
        id ? id : undefined
    );

    useEffect(() => {
        if (id !== null) {
            getChildrenWithBooks(id).then((response) =>
                setChildrenData(response?.data.data)
            );
        }
    }, [id, isSuccess]);

    if (childrenData) {
        return (
            <div style={{ marginTop: '60px' }}>
                <AdminHeader logOut={logOut} />
                <div className={styles['add_user_form']}>
                    <Flex justify={'center'} gap={'middle'} align={'center'}>
                        <h1>Добавление ребенка</h1>
                        <Button
                            onClick={() => {
                                setIsFormShown((prevState) => !prevState);
                                setIsSuccess(false);
                            }}
                        >
                            {isFormShown ? 'скрыть' : 'добавить'}
                        </Button>
                    </Flex>
                    {isFormShown && (
                        <Form
                            name="basic"
                            style={{ maxWidth: '400px' }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="true"
                            layout="vertical"
                        >
                            <Form.Item<FieldType>
                                label="Почта"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожалуйста, укажите почту!',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Это не похоже на email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Имя ребенка"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожалуйста, укажите имя!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Фамилия"
                                name="lastName"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Пожалуйста, укажите вашу фамилию!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Пароль"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожалуйста, укажите пароль!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Повторите пароль"
                                name="confirm"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Пожалуйста, повторите пароль!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue('password') ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    'Пароли не совпадают!'
                                                )
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Flex
                                    justify="space-between"
                                    align="center"
                                    gap={6}
                                >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="middle"
                                    >
                                        Добавить
                                    </Button>
                                </Flex>
                            </Form.Item>
                        </Form>
                    )}
                    {isError && (
                        <span className={styles.error}>
                            Попробуйте еще раз, что то не так!
                        </span>
                    )}
                    {isSuccess && (
                        <span className={styles.error}>Ребенок добавлен!</span>
                    )}
                </div>
                <div className="table-container">
                    <h2>Мои дети</h2>
                    <table className={styles['user__table']}>
                        <thead>
                            <tr>
                                <th align={'left'}>Имя</th>
                                <th>Фамилия</th>
                                <th align={'left'}>Почта</th>
                                <th>Прочитанные книги (кол-во)</th>
                                <th align={'left'}>Сейчас читает</th>
                            </tr>
                        </thead>
                        <tbody>
                            {childrenData.map((user, index) => (
                                <tr
                                    key={user.id}
                                    style={{
                                        background: index % 2 ? '#F2F2F2' : '',
                                    }}
                                >
                                    <td>{user.name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td align={'center'}>
                                        {user.assignedBooks.length || '-'}
                                    </td>
                                    <td>
                                        <Link
                                            to={
                                                '/books/' +
                                                user.assignedBooks[0]?.id
                                            }
                                        >
                                            {user.assignedBooks[0]?.name}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return null;
};

export default ParentRoute;
