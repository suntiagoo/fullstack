import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const NoteForm = () => {

    const dispatch = useDispatch()

    const addNote = (event) => {
        try {
            event.preventDefault()
            const content = event.target.note.value
            dispatch(createNote(content))
            dispatch(showNotification('The notification was created successfully'))
            setTimeout(() => { dispatch(showNotification('')) }, 5000)
            event.target.note.value = ''
        } catch (exception) {
            dispatch(showNotification(`was a error ${exception}`))
            setTimeout(() => { dispatch(showNotification('')) }, 5000)
        }
    }

    return (
        <div style={{ marginBottom: '2em' }}>
            <form onSubmit={addNote}>
                <input name='note' placeholder='e.g. write your new blog' />
                <button type='submit'>Add</button>
            </form>
        </div>

    )

}

export default NoteForm