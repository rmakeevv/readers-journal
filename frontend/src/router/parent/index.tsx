import { useEffect, useState } from 'react';
import { getChildrenWithBooks } from '../../services';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../store/user/slice';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { AdminHeader } from '../../components';
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

const getRegisterFormToggleButtonTitle = (isFormShown: boolean) =>
    isFormShown ? 'отмена' : 'добавить';

const CHILD_REGISTER_FORM_TITLE = 'Добавление ребенка';

const ParentRoute = () => {
    const id = useSelector(selectUserId);
    const [childrenData, setChildrenData] = useState<ChildData[] | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFormShown, setIsFormShown] = useState(false);
    const logOut = UseLogOut();

    const onChildrenRegisterSuccess = () => {
        setIsSuccess(true);
        setIsFormShown(false);
    };

    const handleRegisterChildFormToggleButtonClick = () => {
        setIsFormShown((prevState) => !prevState);
        setIsSuccess(false);
    };

    const { onFinish, isError } = useSubmitRegisterForm(
        onChildrenRegisterSuccess,
        rolesEnum.student,
        id
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
            <div className={styles['page__container']}>
                <AdminHeader logOut={logOut} />
                <div className={styles['child_register_form__container']}>
                    <Flex
                        justify={'space-between'}
                        gap={'middle'}
                        align={'center'}
                    >
                        <h1 className={styles['child_register_form__title']}>
                            {CHILD_REGISTER_FORM_TITLE}
                        </h1>
                        <Button
                            onClick={handleRegisterChildFormToggleButtonClick}
                        >
                            {getRegisterFormToggleButtonTitle(isFormShown)}
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
                                        message: 'Пожалуйста, укажите фамилию!',
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
                    <h2 className={styles['children-table__title']}>
                        Мои дети: {childrenData.length}
                    </h2>
                    <table className={styles['user__table']}>
                        <thead>
                            <tr>
                                <th align={'left'}>Имя, Почта</th>
                                <th>Назначенные книги</th>
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
                                    <td
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <i>{user.name}</i>
                                        <i>{user.email}</i>
                                    </td>
                                    <td align={'center'}>
                                        {!user.assignedBooks.length && (
                                            <Link
                                                className={
                                                    styles[
                                                        'child__assigned__book__title'
                                                    ]
                                                }
                                                to={'/books'}
                                            >
                                                Выбрать книгу
                                            </Link>
                                        )}
                                        <div
                                            className={
                                                styles['child__assigned__books']
                                            }
                                        >
                                            {user.assignedBooks.map(
                                                (book, index) => {
                                                    if (index > 6) {
                                                        return null;
                                                    }

                                                    if (index > 5) {
                                                        return (
                                                            <span key={book.id}>
                                                                и еще{' '}
                                                                {user
                                                                    .assignedBooks
                                                                    .length -
                                                                    index}
                                                            </span>
                                                        );
                                                    }

                                                    return (
                                                        <Link
                                                            className={
                                                                styles[
                                                                    'child__assigned__book__title'
                                                                ]
                                                            }
                                                            key={book.id}
                                                            to={
                                                                '/books/' +
                                                                book.id
                                                            }
                                                        >
                                                            <span
                                                                style={{
                                                                    padding:
                                                                        '2px',
                                                                }}
                                                            >
                                                                {book.name}
                                                            </span>
                                                        </Link>
                                                    );
                                                }
                                            )}
                                        </div>
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
