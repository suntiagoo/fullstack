import deepFreeze from 'deep-freeze'
import { describe, expect, test } from 'vitest'
import reducer from './counterReducer'

describe('unicafe reducer', () => {
    const initialState = {
        good: 0,
        ok: 0,
        bad: 0
    }

    test('should return a proper initial state when called with undefined state', () => {
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = reducer.counterReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    test('good is incremented', () => {
        const action = {
            type: 'GOOD'
        }
        const state = initialState

        deepFreeze(state)
        const newState = reducer.counterReducer(state, action)
        expect(newState).toEqual({
            good: 1,
            ok: 0,
            bad: 0
        })
    })

    test('ok is incremented', () => {
        const action = {
            type: 'OK'
        }

        const state = initialState

        deepFreeze(state)
        const newState = reducer.counterReducer(state, action)
        expect(newState).toEqual({ good: 0, ok: 1, bad: 0 })
    })

    test('bad is incremented', () => {
        const action = {
            type: 'BAD'
        }

        const state = initialState

        deepFreeze(state)
        const newState = reducer.counterReducer(state, action)
        expect(newState).toEqual({ good: 0, ok: 0, bad: 1 })
    })

    test('the total value is invcremented', () => {

        const action = {
            type: 'TOTAL'
        }

        const initialState = {
            good: 3,
            ok: 3,
            bad: 3
        }
        deepFreeze(initialState)
        const newState = reducer.counterReducer(initialState, action)
        expect(newState).toEqual(9)
    })

    test('avarge value of feedback', () => {
        const action = {
            type: 'AVERAGE'
        }

        const initialState = {
            good: 6,
            ok: 2,
            bad: 1
        }

        deepFreeze(initialState)
        const newState = reducer.counterReducer(initialState, action)
        expect(newState).toEqual(0.5555555555555556)
    })

    test('positive value of feedback', () => {
        const action = {
            type: 'POSITIVE'
        }
        const initialState = {
            good: 6,
            ok: 2,
            bad: 1
        }

        deepFreeze(initialState)
        const newState = reducer.counterReducer(initialState, action)
        expect(newState).toEqual(66.66666666666667)
    })
})