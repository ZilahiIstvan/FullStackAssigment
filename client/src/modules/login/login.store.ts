import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface LoginState {
  loadingProgress: number
  error: string
  userId: string
}

const initialState: LoginState = {
  loadingProgress: 0,
  error: '',
  userId: ''
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    },
    setLoginError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    loginIncLoading: (state) => {
      state.loadingProgress++
    },
    loginDecLoading: (state) => {
      state.loadingProgress--
    }
  }
})

export const { loginIncLoading, loginDecLoading, setUserId, setLoginError } = loginSlice.actions

const loginReducer = loginSlice.reducer
export default loginReducer
