import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const newObject = action.payload
      const id = action.payload.id

      return state.map((a) => {
        return a.id !== id ? a : newObject
      })
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    setBlogs(state, action) {
      return action.payload
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { addVote, appendBlog, setBlogs, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlogs = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
      setNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        5
      )
    } catch (exception) {
      setNotification('Something went wrong with blog creation', 5)
    }
  }
}

export const voteBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog.id, blog)
    dispatch(addVote(likedBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    const removedBlog = await blogService.remove(id)

    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer
