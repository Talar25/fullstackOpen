import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    changeNotification(state, action) {
      return action.payload
    },
  },
})

export const { changeNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(changeNotification(content))
    setTimeout(() => {
      dispatch(changeNotification(null))
    }, time * 1000)
  }
}

export default notificationSlice.reducer
