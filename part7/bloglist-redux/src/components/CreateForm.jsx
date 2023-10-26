import { useState } from 'react'

export default function CreateForm({ handleCreate }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const addBlog = (event) => {
    event.preventDefault()
    handleCreate({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2> create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            id='title'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
            placeholder='title'
          />
        </div>
        <div>
          author
          <input
            id='author'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='author'
          />
        </div>
        <div>
          url
          <input
            id='url'
            type='text'
            value={url}
            name='Password'
            onChange={({ target }) => setUrl(target.value)}
            placeholder='url'
          />
        </div>
        <button id='create-button' type='submit'>
          create
        </button>
      </form>
    </>
  )
}
