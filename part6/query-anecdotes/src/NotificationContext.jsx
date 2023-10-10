import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'create':
      return `anecdote '${action.payload}' was added`
    case 'vote':
      return `anecdote '${action.payload}' was voted`
    case 'error/length':
      return 'too short anecdote, must have length 5 or more'
    case 'nothing':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  function voteAnecdoteNotification(anecdote) {
    dispatch({ type: 'vote', payload: anecdote.content })
    setTimeout(() => dispatch({ type: 'nothing' }), 5000)
  }

  function createAnecdoteNotification(anecdote) {
    dispatch({ type: 'create', payload: anecdote })
    setTimeout(() => dispatch({ type: 'nothing' }), 5000)
  }

  function errorLengthNotification() {
    dispatch({ type: 'error/length' })
    setTimeout(() => dispatch({ type: 'nothing' }), 5000)
  }

  return (
    <NotificationContext.Provider
      value={{
        notification,
        voteAnecdoteNotification,
        createAnecdoteNotification,
        errorLengthNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined)
    throw new Error(
      'NotificationContext was used outside the NotificationProvider'
    )
  return context
}
