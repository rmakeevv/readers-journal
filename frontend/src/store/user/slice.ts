import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { rolesEnum } from '../../constants/user';

// Define a type for the slice state
export interface UserState {
    id: string | null;
    role: rolesEnum | null;
    email: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
    id: null,
    role: null,
    email: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setUserRole: (state, action: PayloadAction<rolesEnum>) => {
            state.role = action.payload;
        },
    },
});

export const { setUserRole } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserRole = (state: RootState) => state.user.role;

export default userSlice.reducer;
