import { useContext } from 'react';
import { UserContext } from 'router/AuthProvider';

export default function UseLogOut() {
    const { setIsLogged } = useContext(UserContext);
    return () => {
        localStorage.clear();
        setIsLogged(false);
    };
}
