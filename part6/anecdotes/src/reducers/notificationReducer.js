import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        showNotification(state, action) {
            console.log(action)
            console.log(state)
            return action.payload
        }
    },
})

//export const { showNotification } = notificationSlice.actions

const { showNotification } = notificationSlice.actions

export const setNotification = (text, timeout) => {
    return (dispatch) => {

        setTimeout(() => {
            dispatch(showNotification(''))
        }, timeout * 1000);
        dispatch(showNotification(text))
    }

}


export default notificationSlice.reducer