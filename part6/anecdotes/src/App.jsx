import './App.css'
import { increaseVote } from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import NoteForm from './components/NoteForm'

const Title = ({ title }) => <h2>{title}</h2>

const Anecdote = ({ anecdotes, handleSumVote }) => {
  return (<>
    <li > {anecdotes.content}</li>
    <p>{`has ${anecdotes.votes}`} <button onClick={handleSumVote} >vote</button> </p>
  </>)

}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const sumVote = (id, event) => {
    event.preventDefault()
    dispatch(increaseVote(id))
  }

  return (
    <ul>
      {anecdotes && anecdotes.map((anecdote) =>
        <Anecdote key={anecdote.id} anecdotes={anecdote} handleSumVote={(event) => sumVote(anecdote.id, event)} />

      )}
    </ul>
  )
}

const App = () => {
  /*const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(8).fill(0))
*/



  return (
    <div>
      <NoteForm />
      <Title title={'Anecdote of the day'} />
      <Anecdotes />
      <Title title={'Anecdote with most vote'} />

    </div>
  )
}

export default App