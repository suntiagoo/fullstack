//import { increaseVote } from '../reducers/anecdoteReducer'
//import { showNotification } from '../reducers/notificationReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
//import noteService from '../services/notes'
import { editNote } from '../reducers/anecdoteReducer'


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

        try {
            event.preventDefault()
            let AnecdoteToModify = anecdotes.find(anecdote => anecdote.id === id)
            AnecdoteToModify = { ...AnecdoteToModify, votes: AnecdoteToModify.votes + 1 }

            dispatch(editNote(id, AnecdoteToModify))
            dispatch(setNotification(`you voted '${AnecdoteToModify.content}'`, 10))
            //setTimeout(() => { dispatch(showNotification('')) }, 5000)
        } catch (exception) {
            dispatch(setNotification(`was a error ${exception}`, 10))
            //setTimeout(() => { dispatch(showNotification('')) }, 5000)
        }
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