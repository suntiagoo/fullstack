import './App.css'
import NoteForm from './components/NoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { initializeNote } from './reducers/anecdoteReducer'

const Title = ({ title }) => <h2>{title}</h2>

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    //noteService.getAll().then(notes => dispatch(setNotes(notes)))
    dispatch(initializeNote())
  }, [dispatch])


  return (
    <div>
      <Title title={'Anecdote of the day'} />
      <Notification />
      <NoteForm />
      <Filter />
      <AnecdoteList />

    </div>
  )
}

export default App