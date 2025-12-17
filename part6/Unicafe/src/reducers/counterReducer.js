const initialStateCounter = {
    good: 0,
    ok: 0,
    bad: 0,
    total: 0,
    average: 0,
    positive: 0
}
const counterReducer = (state = initialStateCounter, action) => {
    console.log(action)
    switch (action.type) {
        case 'GOOD':
            return { ...state, good: state.good + 1 }
        case 'OK':
            return { ...state, ok: state.ok + 1 }
        case 'BAD':
            return { ...state, bad: state.ok + 1 }
        case 'TOTAL':
            return { ...state, total: state.good + state.ok + state.bad }
        case 'AVERAGE':
            return ({ ...state, average: (state.good + (state.bad * - 1)) / (state.good + state.ok + state.bad) })
        case 'POSITIVE':
            return ({ ...state, positive: (state.good * 100) / (state.good + state.ok + state.bad) })
        default: return state
    }
}


export default { counterReducer } 