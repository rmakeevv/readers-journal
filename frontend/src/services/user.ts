import { instance } from './index';

interface RegisterData {
    email?: string;
    name?: string;
    lastName?: string;
    password?: string;
    confirm?: string;
    agreement?: boolean;
    last_name?: string;
    parent_id: number | null;
}

interface LoginData {
    email?: string;
    password?: string;
    remember?: boolean;
}

export const UserService = {
    register: async (data: RegisterData) => {
        try {
            await instance.post('/user/register', data);
        } catch (e) {
            console.log(
                'Не удалось выполнить запрос на регистрацию нового пользователя: ',
                e
            );
        }
    },
    login: async (data: LoginData) => {
        try {
            const response = await instance.post('/user/login', data);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    },
};
