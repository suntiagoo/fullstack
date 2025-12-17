import { useDispatch } from 'react-redux'
import { addNote } from '../reducers/anecdoteReducer'

const NoteForm = () => {

    const dispatch = useDispatch()

    const sumNote = (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        dispatch(addNote(content))

    }

    return (
        <form onSubmit={sumNote}>
            <input name='note' placeholder='e.g. write your new blog' />
            <button type='submit'>Add</button>
        </form>
    )

}

export default NoteForm