import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filter(state, action) {
            return action.payload
        }
    },
})

export const { filter } = filterSlice.actions
export default filterSlice.reducer


/*export const filter = (filter) => {
    return {
        type: 'FILTER_NOTE',
        payload: filter
    }
}

const reducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'FILTER_NOTE': {
            return action.payload
        }
    }
    return state
}

export default reducer*/

