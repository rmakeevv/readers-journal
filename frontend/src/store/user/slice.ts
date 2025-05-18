import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { rolesEnum } from '../../constants/user';
import { DecodedTokenProps } from '../../types';

export interface UserState {
    id: number | null;
    role: rolesEnum | null;
    email: string | null;
}

const initialState: UserState = {
    id: null,
    role: null,
    email: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<DecodedTokenProps>) => {
            return {
                ...state,
                id: action.payload.userId,
                role: action.payload.role,
                email: action.payload.email,
            };
        },
    },
});

export const { setUserData } = userSlice.actions;

export const selectUserRole = (state: RootState) => state.user.role;
export const selectUserId = (state: RootState) => state.user.id;
export const selectUserEmail = (state: RootState) => state.user.email;
export const selectUserData = (state: RootState) => state.user;

export default userSlice.reducer;
