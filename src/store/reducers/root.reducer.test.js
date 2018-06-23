import reducer, { initialState } from './root.reducer'
import { initFinished } from '../actions'

describe('root reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should return unchanged state', () => {
    const state = {}
    expect(reducer(state, {})).toBe(state)
  })

  it('should handle INIT_FINISHED', () => {
    const memoDashLib = {}
    expect(reducer([], initFinished(memoDashLib))).toEqual({ memoDashLib })
  })
})
