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
};
