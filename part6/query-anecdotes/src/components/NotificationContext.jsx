import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ANECDOTE':
            return `was add with succeful ${action.payload.content}`
        case 'APPEND_VOTE':
            return `you voted  ${action.payload.content}`
        case 'RESET':
            return ''
        case 'ERROR':
            return ` ${action.payload.error}`
        default: return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {

    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={{ notification, notificationDispatch }}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext