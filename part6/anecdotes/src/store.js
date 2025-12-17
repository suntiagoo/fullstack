import { configureStore } from '@reduxjs/toolkit'

import noteReducer from './reducers/anecdoteReducer.js'
import filterReducer from './reducers/filterReducer.js'


const store = configureStore({
    reducer: {
        notes: noteReducer,
        filter: filterReducer
    }
})

export default store