import { useNotification } from '../NotificationContext'

const AnecdoteForm = ({ newAnecdoteMutation }) => {
  const { createAnecdoteNotification, errorLengthNotification } =
    useNotification()
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length > 5) {
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate({ content, votes: 0 })
      createAnecdoteNotification(content)
    } else errorLengthNotification()
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

