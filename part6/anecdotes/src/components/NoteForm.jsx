import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { appendNote } from '../reducers/anecdoteReducer'

const NoteForm = () => {

    const dispatch = useDispatch()

    const addNote = (event) => {
        try {
            event.preventDefault()
            const content = event.target.note.value
            //const newNote = await noteService.createNote(content)
            //dispatch(createNote(newNote))
            dispatch(appendNote(content))
            dispatch(setNotification('The notification was created successfully', 10))
            //setTimeout(() => { dispatch(showNotification('')) }, 5000)
            event.target.note.value = ''
        } catch (exception) {
            dispatch(setNotification(`was a error ${exception}`, 10))
            //setTimeout(() => { dispatch(showNotification('')) }, 5000)
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