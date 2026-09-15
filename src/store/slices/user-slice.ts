import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../types'

const initialState: User = { login: '', isAuth: false }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.login = action.payload
      state.isAuth = true
    },
    logout(state) {
      state.login = ''
      state.isAuth = false
    },
  },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer