import {
    AdminHeader,
    ContentWrapper,
    CreateForm,
    EditableCell,
} from 'components';
import { UseGetAllBooksData, UseLogOut, UseSaveRow } from 'hooks';
import { useState } from 'react';
import { Button, Flex, Form, message, Popconfirm, Space, Table } from 'antd';
import { IBook, OnFinishFailedErrorInfo } from 'types';
import {
    DeleteOutlined,
    EditOutlined,
    RollbackOutlined,
    SaveOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { deleteOneBook } from '../../services';
import { BookService } from '../../services/book';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../store/user/slice';
import { rolesEnum } from '../../constants/user';

const Books = () => {
    const [bookList, setBookList] = useState<IBook[]>([]);
    const [editingKey, setEditingKey] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const userRole = useSelector(selectUserRole);
    const isAdmin = userRole === rolesEnum.admin;

    const deleteRecord = async (item: IBook) => {
        try {
            await deleteOneBook(item.id);
            setBookList((prev) => prev.filter((book) => book.id !== item.id));
            messageApi.success('Книга успешно удалена'); // Добавил уведомление об успехе
        } catch (e) {
            console.error('Ошибка при удалении книги:', e);
            messageApi.error('Не удалось удалить книгу'); // Уведомление об ошибке
        }
    };

    const logOut = UseLogOut();

    const showSuccessMessage = (content: string) => {
        messageApi.open({
            type: 'success',
            content,
        });
    };

    const onSuccessCreate = (data: IBook) => {
        setBookList((prevState) => {
            if (prevState) {
                showSuccessMessage('Запись успешно добавлена!');
                return [data, ...prevState];
            }
            return [data];
        });
    };

    const onFinish = async (values: IBook) => {
        try {
            const data = await BookService.createOne(values);
            data && onSuccessCreate(data);
        } catch (e) {
            console.log(e);
        }
    };

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
                            disabled={!isAdmin || editingKey !== ''}
                            onClick={() => edit(record)}
                            icon={<EditOutlined />}
                        ></Button>
                        <Popconfirm
                            title="Уверены, что хотите удалить?"
                            onConfirm={() => deleteRecord(record)}
                        >
                            <Button
                                disabled={!isAdmin}
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

    const onFetchingBooksSuccess = (data: IBook[]) => {
        setBookList(data);
    };

    const { loading, error } = UseGetAllBooksData(onFetchingBooksSuccess);

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

                {isAdmin && (
                    <CreateForm
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    />
                )}

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
