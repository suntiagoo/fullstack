export const filter = (filter) => {
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

export default reducer