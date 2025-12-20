import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'
import { useReducer } from 'react'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const AnecdoteForm = () => {

  const { notificationDispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      notificationDispatch({ type: 'ERROR', payload: { error: error } })
      setTimeout(() => { setTimeout(() => { notificationDispatch({ type: 'RESET' }) }, 5000) })
    },
  })

  const onCreate = (event) => {
    if (!newAnecdoteMutation.isError) {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      console.log('new anecdote')
      newAnecdoteMutation.mutate({ content, votes: 0 })
      if (!newAnecdoteMutation.isError) {
        notificationDispatch({ type: 'ADD_ANECDOTE', payload: { content: content } })
        setTimeout(() => { setTimeout(() => { notificationDispatch({ type: 'RESET' }) }, 5000) })
      }
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
