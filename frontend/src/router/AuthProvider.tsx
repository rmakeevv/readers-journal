import { UseValidateTokenFromLocalStorage } from 'hooks/UseValidateTokenFromLocalStorage';
import { Outlet } from 'react-router-dom';
import { Dispatch, SetStateAction, useState } from 'react';

import { createContext } from 'react';

export type UserContextType = {
    isLogged: boolean;
    setIsLogged: Dispatch<SetStateAction<boolean>>;
};

export const UserContext = createContext<UserContextType>({
    isLogged: false,
    setIsLogged: (v) => v,
});

export default function AuthProvider() {
    const [isLogged, setIsLogged] = useState(false);
    const loading = UseValidateTokenFromLocalStorage(isLogged, setIsLogged);

    if (!loading)
        return (
            <UserContext.Provider value={{ isLogged, setIsLogged }}>
                <Outlet />
            </UserContext.Provider>
        );

    return <></>;
}
