import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'

const NoteForm = () => {

    const dispatch = useDispatch()

    const sumNote = (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        dispatch(createNote(content))

    }

    return (
        <div style={{ marginBottom: '2em' }}>
            <form onSubmit={sumNote}>
                <input name='note' placeholder='e.g. write your new blog' />
                <button type='submit'>Add</button>
            </form>
        </div>

    )

}

export default NoteForm