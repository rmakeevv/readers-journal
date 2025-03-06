import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'router/AuthProvider';
import { instance } from 'services';
import {
    LOCALSTORAGE_ID_TOKEN_KEY,
    TOKEN_HEADER_KEY,
} from '../constants/id-token';
import { jwtDecode } from 'jwt-decode';
import { rolesEnum } from '../constants/user';
import { routesEnum } from '../constants/routes';
import { useAppDispatch } from '../store/hooks';
import { setUserRole } from '../store/user/slice';

type FieldType = {
    username?: string;
    password?: string;
};

type UseAuthFormProps = () => {
    onFinish: (values: FieldType) => Promise<void>;
    isError: boolean;
};

export const UseAuthForm: UseAuthFormProps = () => {
    const { setIsLogged } = useContext(UserContext);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const onFinish = async (values: FieldType) => {
        try {
            const response = await instance.post('/user/auth', values);
            const decoded = jwtDecode<{ role: rolesEnum }>(response.data);
            const { role } = decoded;

            instance.defaults.headers.common[TOKEN_HEADER_KEY] = response.data;
            localStorage.setItem(LOCALSTORAGE_ID_TOKEN_KEY, response.data);
            setIsLogged(true);

            dispatch(setUserRole(role));

            if (role === rolesEnum.admin) {
                navigate(routesEnum.admin, { replace: true });
            } else {
                navigate(routesEnum.base);
            }
        } catch (e) {
            setIsError(true);
            console.log(e);
        }
    };

    return { onFinish, isError };
};
