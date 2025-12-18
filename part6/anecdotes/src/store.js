import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './reducers/anecdoteReducer.js'
import filterReducer from './reducers/filterReducer.js'
import notificationReducer from './reducers/notificationReducer.js'

const store = configureStore({
    reducer: {
        notes: noteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
})

export default store