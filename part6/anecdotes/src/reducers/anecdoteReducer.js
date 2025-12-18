import { createSlice } from '@reduxjs/toolkit'

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
            const id = action.payload
            const anecdote = state.find(anecdote => anecdote.id === id)
            state = state.filter(anecdote => anecdote.id !== id)
            return [...state, { ...anecdote, votes: anecdote.votes + 1 }]
            /*state = state.map(anecdote => {
                if (Number(anecdote.id) === Number(id)) {
                    return { ...anecdote, votes: anecdote.votes + 1 }
                }
                return anecdote
            }
            )
            //console.log(state)
            return state
*/
        },
        setNotes(state, action) {
            return action.payload
        }
    }
})

export const { createNote, increaseVote, setNotes } = noteReducer.actions
export default noteReducer.reducer
