import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'router/AuthProvider';
import { instance } from 'services';
import { TOKEN_HEADER_KEY } from '../constants/id-token';

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

    const onFinish = async (values: FieldType) => {
        try {
            const token = await instance.post('/user/auth', values);
            instance.defaults.headers.common[TOKEN_HEADER_KEY] = token.data;
            localStorage.setItem('token', token.data);
            setIsLogged(true);
            navigate('/');
        } catch (e) {
            setIsError(true);
            console.log(e);
        }
    };

    return { onFinish, isError };
};
