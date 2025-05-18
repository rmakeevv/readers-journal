import { instance } from '../services';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rolesEnum } from '../constants/user';

type FieldType = {
    email?: string;
    name?: string;
    lastName?: string;
    password?: string;
    confirm?: string;
    agreement?: boolean;
};

type UseSubmitRegisterFormProps = (
    onSuccess: () => void,
    userRole: rolesEnum,
    parentId?: number
) => {
    onFinish: (values: FieldType) => Promise<void>;
    isError: boolean;
};

export const useSubmitRegisterForm: UseSubmitRegisterFormProps = (
    onSuccess,
    userRole,
    parentId
) => {
    const [isError, setIsError] = useState(false);

    const onFinish = async (values: FieldType) => {
        try {
            const userData = {
                ...values,
                role: userRole,
                last_name: values.lastName,
                parent_id: parentId ? parentId : null,
            };
            await instance.post('/user/register', userData);
            setIsError(false);
            onSuccess();
        } catch (e) {
            setIsError(true);
            console.log(e);
        }
    };

    return { onFinish, isError };
};
