import {
    ContentWrapper,
    CreateForm,
    EditableCell,
    AdminHeader,
} from 'components';
import {
    UseDeleteItem,
    UseFinishCreate,
    UseLogOut,
    UseSaveRow,
    UseGetAllBooksData,
} from 'hooks';
import { useState } from 'react';
import { Button, Flex, Form, message, Popconfirm, Space, Table } from 'antd';
import { BookList, IBook, OnFinishFailedErrorInfo } from 'types';
import {
    DeleteOutlined,
    EditOutlined,
    RollbackOutlined,
    SaveOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Books = () => {
    const [bookList, setBookList] = useState<BookList>();
    const [editingKey, setEditingKey] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const deleteRecord = UseDeleteItem(bookList, setBookList);

    const logOut = UseLogOut();

    const showSuccessMessage = (content: string) => {
        messageApi.open({
            type: 'success',
            content,
        });
    };
    const onFinish = UseFinishCreate(setBookList, showSuccessMessage);

    const isEditing = (record: IBook) => record.id.toString() === editingKey;

    const onFinishFailed = (errorInfo: OnFinishFailedErrorInfo<IBook>) => {
        console.log('Failed:', errorInfo);
    };

    const edit = (record: Partial<IBook>) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.id ? record.id.toString() : ' ');
    };

    const cancelEditing = () => {
        setEditingKey('');
    };

    const { save, form } = UseSaveRow(setBookList, setEditingKey, bookList);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id: string) => <Link to={'books/' + id}>{id}</Link>,
        },
        {
            title: 'Название',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: 'Год',
            dataIndex: 'year',
            editable: true,
            width: '70px',
        },
        {
            title: 'Количество',
            dataIndex: 'instock',
            editable: true,
        },
        {
            title: 'Жанр',
            editable: true,
            dataIndex: 'genre',
        },
        {
            title: 'Автор',
            editable: true,
            dataIndex: 'author',
        },
        {
            width: '130px',
            dataIndex: 'operation',
            // eslint-disable-next-line
            render: (_: any, record: IBook) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space>
                        <Button
                            onClick={() => save(record.id)}
                            type={'default'}
                            size={'large'}
                            icon={<SaveOutlined />}
                        ></Button>
                        <Popconfirm
                            title="Уверены, что хотите отменить?"
                            onConfirm={cancelEditing}
                        >
                            <Button
                                size={'large'}
                                icon={<RollbackOutlined />}
                            ></Button>
                        </Popconfirm>
                    </Space>
                ) : (
                    <Space>
                        <Button
                            type={'default'}
                            size={'large'}
                            disabled={editingKey !== ''}
                            onClick={() => edit(record)}
                            icon={<EditOutlined />}
                        ></Button>
                        <Popconfirm
                            title="Уверены, что хотите удалить?"
                            onConfirm={() => deleteRecord(record)}
                        >
                            <Button
                                type={'default'}
                                size={'large'}
                                icon={<DeleteOutlined />}
                            ></Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    const { loading, error } = UseGetAllBooksData(setBookList);

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: IBook) => ({
                record,
                inputType:
                    col.dataIndex === 'year' || col.dataIndex === 'instock'
                        ? 'number'
                        : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    if (error)
        return (
            <Flex align={'center'} justify={'center'} vertical>
                <p>{error.message}</p>
                <span>Не удалось загрузить данные!</span>
            </Flex>
        );

    return (
        <div>
            <AdminHeader logOut={logOut} />
            <ContentWrapper>
                {contextHolder}

                <CreateForm
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                />

                <div className={'table-container'}>
                    <Form form={form} component={false}>
                        <Table
                            columns={mergedColumns}
                            rowKey={(item: IBook) => item.id}
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            bordered
                            dataSource={bookList}
                            rowClassName="editable-row"
                            pagination={{
                                onChange: cancelEditing,
                            }}
                            loading={loading}
                        />
                    </Form>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default Books;
