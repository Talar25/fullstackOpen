import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const createFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))

      // blogService.setToken(user.token);
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`Logged as ${user.username}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  function handleCreate(newObject) {
    createFormRef.current.toggleVisibility()
    blogService.create(newObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${newObject.title} by ${newObject.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const deleteBlog = async (BlogToDelete) => {
    try {
      if (window.confirm(`Delete ${BlogToDelete.title} ?`)) {
        blogService.remove(BlogToDelete.id)
        setMessage(`Blog ${BlogToDelete.title} was successfully deleted`)
        setBlogs(blogs.filter((blog) => blog.id !== BlogToDelete.id))
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } catch (exception) {
      setMessage(`Cannot delete blog ${BlogToDelete.title}`)

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  function handleLogout() {
    window.localStorage.clear()
    setUser(null)
  }

  function addLike(id) {
    const blog = blogs.find((b) => b.id === id)

    const newObject = { ...blog, likes: blog.likes + 1 }

    blogService.update(id, newObject).then((returneBlog) => {
      setBlogs(
        blogs
          .map((blog) => (blog.id !== id ? blog : returneBlog))
          .sort((a, b) => b.likes - a.likes)
      )
    })
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

