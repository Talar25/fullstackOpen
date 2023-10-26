import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout(state, action) {
      return action.payload
    },
  },
})

export const { login, logout } = loginSlice.actions

export const logUserIn = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)

    userService.setUser(user)
    dispatch(login(user))
  }
}

export const logUserOut = () => {
  return async (dispatch) => {
    userService.clearUser()
    dispatch(logout(null))
  }
}

export default loginSlice.reducer
