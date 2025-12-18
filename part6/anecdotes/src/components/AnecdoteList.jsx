import { increaseVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import noteService from '../services/notes'


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
    //console.log(anecdotes)

    const sumVote = async (id, event) => {

        try {
            event.preventDefault()
            let AnecdoteToModify = anecdotes.find(anecdote => anecdote.id === id)
            AnecdoteToModify = { ...AnecdoteToModify, votes: AnecdoteToModify.votes + 1 }

            console.log('objecto modificado', AnecdoteToModify)
            const aux = await noteService.updateNote(id, AnecdoteToModify)
            console.log('respomde del update', aux)
            dispatch(increaseVote(id))

            dispatch(showNotification('the like increase succefull'))
            setTimeout(() => { dispatch(showNotification('')) }, 5000)

        } catch (exception) {
            dispatch(showNotification(`was a error ${exception}`))
            setTimeout(() => { dispatch(showNotification('')) }, 5000)
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