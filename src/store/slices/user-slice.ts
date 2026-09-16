import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/user';

const initialState: User = { login: '' };

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<string>) {
			state.login = action.payload;
		},
		logout(state) {
			state.login = '';
		},
	},
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;