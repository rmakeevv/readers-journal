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

type UseSubmitRegisterFormProps = () => {
    onFinish: (values: FieldType) => Promise<void>;
    isError: boolean;
};

export const useSubmitRegisterForm: UseSubmitRegisterFormProps = () => {
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: FieldType) => {
        try {
            const userData = {
                ...values,
                role: rolesEnum.parent,
                last_name: values.lastName,
            };
            await instance.post('/user/register', userData);
            navigate('/register/success');
        } catch (e) {
            setIsError(true);
            console.log(e);
        }
    };

    return { onFinish, isError };
};
