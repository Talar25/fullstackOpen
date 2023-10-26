import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const setUser = (user) => {
  window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
  setToken(user.token)
}

const getUser = () => {
  const loggedUser = window.localStorage.getItem('loggedAppUser')

  if (loggedUser) {
    const user = JSON.parse(loggedUser)
    token = user.token
    return user
  }

  return null
}

const clearUser = () => {
  window.localStorage.clear()
  token = null
}

const getToken = () => token

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { setUser, getUser, clearUser, getToken, getAllUsers }
