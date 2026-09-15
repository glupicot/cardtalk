import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProfileField } from '../../types'
import { PROFILE_FIELDS } from '../../constants/profile'

const initialState: ProfileField[] = PROFILE_FIELDS

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateField(
      state,
      action: PayloadAction<{ name: string; value: ProfileField['value'] }>
    ) {
      const field = state.find((f) => f.name === action.payload.name)
      if (field) field.value = action.payload.value
    },
    setProfile(_state, action: PayloadAction<ProfileField[]>) {
      return action.payload
    },
  },
})

export const { updateField, setProfile } = profileSlice.actions
export default profileSlice.reducer