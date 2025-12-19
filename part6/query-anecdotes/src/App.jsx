import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './request'

const App = () => {

  const queryClient = useQueryClient()

  const { isLoading, isError, data, error, isFetching } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  const modifyAnecdote = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })



  const handleVote = (anecdote) => {
    modifyAnecdote.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    console.log('vote')
  }

  /*const anecdotes = [
    {
      content: 'If it hurts, do it more often',
      id: '47145',
      votes: 0,
    },
  ]*/


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
