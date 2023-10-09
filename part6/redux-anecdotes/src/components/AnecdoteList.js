import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { changeNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'

export default function AnecdoteList() {
  const anecdotes = useSelector((state) => {
    if (state.filter === 'ALL')
      return state.anecdotes.sort((a, b) => b.votes - a.votes)

    return state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const foundAnecdote = anecdotes.find((a) => a.id === id)
    dispatch(setNotification(`you voted '${foundAnecdote.content}'`, 5))
  }
  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          anecdote={anecdote}
          key={anecdote.id}
          handleClick={() => vote(anecdote.id)}
        />
      ))}
    </ul>
  )
}

function Anecdote({ anecdote, handleClick }) {
  return (
    <li>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  )
}
