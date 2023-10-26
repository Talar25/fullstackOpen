import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import userService from './services/users'
import loginService from './services/login'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { logUserIn, logUserOut, login } from './reducers/loginReducer'
import {
  initializeBlogs,
  createBlogs,
  voteBlog,
  removeBlog,
} from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.login)
  const message = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)

  const createFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const userFromStorage = userService.getUser()
    console.log(userFromStorage)
    if (userFromStorage) {
      dispatch(login(userFromStorage))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const credentials = {
        username,
        password,
      }

      dispatch(logUserIn(credentials))
      const user = userService.getUser()
      console.log(user)

      // blogService.setToken(user.token);
      setUsername('')
      setPassword('')
      dispatch(setNotification(`Logged as ${user.username}`, 5))
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5))
    }
  }

  function handleCreate(newObject) {
    createFormRef.current.toggleVisibility()
    dispatch(createBlogs(newObject))
    dispatch(
      setNotification(
        `a new blog ${newObject.title} by ${newObject.author} added`,
        5
      )
    )
  }

  const deleteBlog = async (blogToDelete) => {
    try {
      if (window.confirm(`Delete ${blogToDelete.title} ?`)) {
        const id = blogToDelete.id
        dispatch(removeBlog(id))
        dispatch(
          setNotification(
            `Blog ${blogToDelete.title} was successfully deleted`,
            5
          )
        )
      }
    } catch (exception) {
      dispatch(setNotification(`Cannot delete blog ${blogToDelete.title}`, 5))
    }
  }

  function handleLogout() {
    dispatch(logUserOut())
  }

  function addLike(id) {
    const findBlog = blogs.find((blog) => blog.id === id)

    dispatch(voteBlog({ ...findBlog, likes: findBlog.likes + 1 }))
  }

  return (
    <div>
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          message={message}
        />
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <Notification message={message} />
          <span>{user.name} logged in</span>
          <button type='submit' onClick={handleLogout}>
            logout
          </button>
          <Togglable label='create new' ref={createFormRef}>
            <CreateForm handleCreate={handleCreate} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={() => addLike(blog.id)}
              onDelete={deleteBlog}
              username={user.username}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default App

