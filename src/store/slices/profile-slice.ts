import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ProfileField } from '../../types/profile';

const initialState: ProfileField[] = [];

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		updateField(
			state,
			action: PayloadAction<{ name: string; value: ProfileField['value'] }>
		) {
			const field = state.find((f) => f.name === action.payload.name);
			if (field) field.value = action.payload.value;
		},
		updateFields(
			state,
			action: PayloadAction<Array<{ name: string; value: ProfileField['value'] }>>
		) {
			action.payload.forEach(({ name, value }) => {
				const field = state.find((f) => f.name === name);
				if (field) field.value = value;
			});
		},
		setProfile(_state, action: PayloadAction<ProfileField[]>) {
			return action.payload;
		},
		clearProfile() {
			return [];
		},
	},
});

export const { updateField, updateFields, setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;