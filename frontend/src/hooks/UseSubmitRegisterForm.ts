import { useState } from 'react';
import { rolesEnum } from '../constants/user';
import { UserService } from '../services/user';

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
    parentId: number | null
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
                parent_id: parentId,
            };

            await UserService.register(userData);
            setIsError(false);
            onSuccess();
        } catch (e) {
            setIsError(true);
            console.log(e);
        }
    };

    return { onFinish, isError };
};
