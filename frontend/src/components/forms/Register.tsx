import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { ValidateErrorEntity } from 'rc-field-form/es/interface';

type FieldType = {
    email?: string;
    name?: string;
    lastName?: string;
    password?: string;
    confirm?: string;
    agreement?: boolean;
};

interface RegisterFormProps {
    onFinish: (values: FieldType) => void;
    onFinishFailed: (errorInfo: ValidateErrorEntity<FieldType>) => void;
}

const RegisterForm = ({ onFinish, onFinishFailed }: RegisterFormProps) => {
    return (
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
                    { required: true, message: 'Пожалуйста, укажите почту!' },
                    {
                        type: 'email',
                        message: 'Это не похоже на email!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Ваше имя"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, укажите ваше имя!',
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
                        message: 'Пожалуйста, укажите вашу фамилию!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Пароль"
                name="password"
                rules={[
                    { required: true, message: 'Пожалуйста, укажите пароль!' },
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
                        message: 'Пожалуйста, повторите пароль!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error('Пароли не совпадают!')
                            );
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Form.Item<FieldType>
                    name="agreement"
                    valuePropName="checked"
                    noStyle
                    rules={[
                        {
                            validator: (_, value) =>
                                value
                                    ? Promise.resolve()
                                    : Promise.reject(
                                          new Error(
                                              'Нужно подтвердить согласие!'
                                          )
                                      ),
                        },
                    ]}
                >
                    <Checkbox>
                        Я согласен на обработку моих персональных данных
                    </Checkbox>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <Flex justify="space-between" align="center" gap={6}>
                    <Button type="primary" htmlType="submit" size="middle">
                        Зарегистрироваться
                    </Button>
                    Уже есть аккаунт? <Link to="/auth">Войти!</Link>
                </Flex>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
