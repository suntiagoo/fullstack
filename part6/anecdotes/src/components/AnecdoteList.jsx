import { increaseVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const Anecdote = ({ anecdotes, handleSumVote }) => {
    return (<>
        <li > {anecdotes.content}</li>
        <p>{`has ${anecdotes.votes}`} <button onClick={handleSumVote} >vote</button> </p>
    </>)

}

const AnecdoteList = () => {

    const dispatch = useDispatch()

    let anecdotes = useSelector(({ notes, filter }) => {
        return notes.filter((note) => {
            return filter === '' ? note : note.content.toLowerCase().includes(filter)
        })
    })

    anecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

    const sumVote = (id, event) => {
        event.preventDefault()
        dispatch(increaseVote(id))
    }

    return (
        <ul>
            {anecdotes && anecdotes.map((anecdote) =>
                <Anecdote key={anecdote.id} anecdotes={anecdote} handleSumVote={(event) => sumVote(anecdote.id, event)} />)
            }
        </ul>
    )
}

export default AnecdoteList