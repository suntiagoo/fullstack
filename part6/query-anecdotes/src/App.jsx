import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './request'
import { useContext } from 'react'
import NotificationContext from './components/NotificationContext'


const App = () => {

  const queryClient = useQueryClient()


  const { notificationDispatch } = useContext(NotificationContext)

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  const modifyAnecdote = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },

  })

  const handleVote = (anecdote) => {
    modifyAnecdote.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({ type: 'APPEND_VOTE', payload: { content: anecdote.content } })
    setTimeout(() => { notificationDispatch({ type: 'RESET' }) }, 5000)
    console.log('vote')
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      {data ? (
        <div>

          <Notification />
          <AnecdoteForm />
          {data.map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          ))}
        </div>

      ) : isLoading ? (
        <span>Loading ....</span>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : (
        <span>Not ready ...</span>
      )}


    </div>
  )
}

export default App
