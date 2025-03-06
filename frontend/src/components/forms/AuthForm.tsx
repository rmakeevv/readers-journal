import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/es/interface';
import { Link } from 'react-router-dom';

type FieldType = {
    email?: string;
    password?: string;
    remember?: boolean;
};

interface AuthFormProps {
    onFinish: (values: FieldType) => void;
    onFinishFailed: (errorInfo: ValidateErrorEntity<FieldType>) => void;
}

export default function AuthForm({ onFinish, onFinishFailed }: AuthFormProps) {
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

            <Form.Item>
                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    noStyle
                >
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <Flex justify="start" align="center" gap={8}>
                    <Button type="primary" htmlType="submit" size="middle">
                        Войти
                    </Button>
                    или <Link to="/register">Зарегистрируйтесь!</Link>
                </Flex>
            </Form.Item>
        </Form>
    );
}
