import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from 'services';
import { LOCALSTORAGE_ID_TOKEN_KEY } from '../constants/id-token';
import { routesEnum } from '../constants/routes';
import { useAppDispatch } from '../store/hooks';
import { setUserRole } from '../store/user/slice';
import { jwtDecode } from 'jwt-decode';
import { rolesEnum } from '../constants/user';

export const UseValidateTokenFromLocalStorage = (
    isLogged: boolean,
    setIsLogged: (_value: boolean) => void
) => {
    const [tokenValidationIsLoading, setTokenValidationIsLoading] =
        useState(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const localToken = localStorage.getItem(LOCALSTORAGE_ID_TOKEN_KEY);

        if (!localToken) {
            setTokenValidationIsLoading(false);
            navigate(routesEnum.auth, { replace: true });
        } else {
            instance.defaults.headers.common['gfg_token_header_key'] =
                localToken;
            instance
                .get('/user/validateToken')
                .then(() => {
                    setIsLogged(true);
                    const decoded = jwtDecode<{ role: rolesEnum }>(localToken);
                    const { role } = decoded;
                    dispatch(setUserRole(role));

                    switch (role) {
                        case rolesEnum.admin: {
                            return navigate(routesEnum.admin);
                        }
                        case rolesEnum.student: {
                            return navigate(
                                routesEnum.profile + routesEnum.student
                            );
                        }
                        case rolesEnum.parent: {
                            return navigate(
                                routesEnum.profile + routesEnum.parent
                            );
                        }
                        default: {
                            return navigate(routesEnum.auth);
                        }
                    }
                })
                .catch(() => {
                    localStorage.removeItem(LOCALSTORAGE_ID_TOKEN_KEY);
                    navigate(routesEnum.auth);
                })
                .finally(() => setTokenValidationIsLoading(false));
        }
    }, [isLogged]);
    return tokenValidationIsLoading;
};
