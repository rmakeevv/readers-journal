import { useContext } from 'react';
import { UserContext } from 'router/AuthProvider';
import { LOCALSTORAGE_ID_TOKEN_KEY } from '../constants/id-token';

export default function UseLogOut() {
    const { setIsLogged } = useContext(UserContext);
    return () => {
        localStorage.removeItem(LOCALSTORAGE_ID_TOKEN_KEY);
        setIsLogged(false);
    };
}
