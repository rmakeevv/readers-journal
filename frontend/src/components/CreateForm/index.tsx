import { Button, Form, Input, InputNumber, Space } from 'antd';
import styles from './index.module.css';
import { CreateFormProps, FieldType } from './types';
import { UseToggle } from 'hooks';
import { useMemo } from 'react';

const toggleClassname = (state: boolean) => (state ? 'fade__in' : 'container');

const CreateForm = ({ onFinish, onFinishFailed }: CreateFormProps) => {
    const { open, toggle } = UseToggle();
    const containerClassName = useMemo(() => toggleClassname(open), [open]);

    return (
        <div className={styles[containerClassName]}>
            {!open && <Button onClick={toggle}>Добавить</Button>}

            {open && (
                <>
                    <Space>
                        Добавить книгу <Button onClick={toggle}>Скрыть</Button>
                    </Space>

                    <Form
                        name="basic"
                        style={{ width: '400px' }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout={'vertical'}
                    >
                        <Form.Item<FieldType>
                            label="Название"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите название!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Год"
                            name="year"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите год!',
                                    type: 'number',
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Жанр"
                            name="genre"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите жанр!!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Автор"
                            name="author"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите автора!!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Добавить
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )}
        </div>
    );
};

export default CreateForm;
