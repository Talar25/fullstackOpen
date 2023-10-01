import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, onDelete, username }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  function toggleVisibility() {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle} className='blog'>
      {!visible ? (
        <div className='note-shortcut'>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
      ) : (
        <div>
          <div>
            <span>{blog.title}</span>
            <button onClick={toggleVisibility}>hide</button>
          </div>
          <div>
            <span>{blog.url}</span>
          </div>
          <div>
            <span>likes {blog.likes}</span>
            <button onClick={handleLike} className='btn-like'>
              like
            </button>
          </div>
          <div>
            <span>{blog.author}</span>
          </div>
          {blog.user.username === username && (
            <button id='delete-btn' onClick={() => onDelete(blog)}>
              delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Blog
