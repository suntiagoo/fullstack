import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

/*const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
    return {
        content: anecdote,
        //id: getId(),
        votes: 0
    }
}

const initialState = anecdotesAtStart.map(asObject)
*/


const noteReducer = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        createNote(state, action) {
            return [...state, { content: action.payload.content, votes: action.payload.votes, id: action.payload.id }]
        },
        increaseVote(state, action) {
            const id = action.payload.id
            state = state.filter((anecdote) => anecdote.id !== id)
            return [...state, action.payload]
        },
        setNotes(state, action) {
            return action.payload
        }
    }
})

const { createNote, setNotes, increaseVote } = noteReducer.actions

export const initializeNote = () => {
    return async (dispatch) => {
        const notes = await noteService.getAll()
        dispatch(setNotes(notes))
    }
}

export const appendNote = (content) => {
    return async (dispatch) => {
        const newNote = await noteService.createNote(content)
        dispatch(createNote(newNote))
    }
}

export const editNote = (id, newObject) => {
    return async (dispatch) => {
        const modifyObject = await noteService.updateNote(id, newObject)
        //console.log('objeto modificado', modifyObject)
        dispatch(increaseVote(modifyObject))

    }
}
export default noteReducer.reducer
