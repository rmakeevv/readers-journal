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
    email?: string;
    password?: string;
    remember?: boolean;
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
            const response = await instance.post('/user/login', values);
            const decodedToken = jwtDecode<{ role: rolesEnum }>(response.data);
            const { role } = decodedToken;

            instance.defaults.headers.common[TOKEN_HEADER_KEY] = response.data;

            if (values.remember) {
                localStorage.setItem(LOCALSTORAGE_ID_TOKEN_KEY, response.data);
            }

            setIsLogged(true);
            dispatch(setUserRole(role));
            console.log(role);

            switch (role) {
                case rolesEnum.admin: {
                    return navigate(routesEnum.admin, { replace: true });
                }
                case rolesEnum.parent:
                    return navigate(
                        routesEnum.profile + '/' + routesEnum.parent,
                        {
                            replace: true,
                        }
                    );
                case rolesEnum.student:
                    return navigate(
                        routesEnum.profile + '/' + routesEnum.student,
                        {
                            replace: true,
                        }
                    );
                default:
                    return navigate(routesEnum.auth);
            }
        } catch (e) {
            setIsError(true);
            console.log(e);
        }
    };

    return { onFinish, isError };
};
