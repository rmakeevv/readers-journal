import { Form, Input, InputNumber } from 'antd';
import { useMemo } from 'react';
import { EditableCellProps } from './types';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    children,
    ...restProps
}: EditableCellProps) => {
    const inputNode = useMemo(
        () => (inputType === 'number' ? <InputNumber /> : <Input />),
        [inputType]
    );

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default EditableCell;
