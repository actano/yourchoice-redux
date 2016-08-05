import { expect } from 'chai'
import { init } from 'yourchoice'
import reducer from '../src/reducer'
import { RANGE_TO } from '../src/actionTypes'

describe('reducer', () => {
  it('should return old state if action contains error', () => {
    const oldState = 'oldState'
    const action = {
      error: 'testError',
    }
    const state = reducer({}, action, oldState)
    expect(state).to.deep.equal(oldState)
  })

  it('should return old state if action has unknown type', () => {
    const oldState = 'oldState'
    const action = {
      type: 'UNKNOWN_TYPE',
    }
    const state = reducer({}, action, oldState)
    expect(state).to.deep.equal(oldState)
  })

  it('should initialize state for every subkey' +
    'from `getSelectionMap` if state is undefined', () => {
    const oldState = undefined
    const action = {
      type: 'UNKNOWN_TYPE',
    }
    const getSelectionMap = {
      selectionA: () => [],
      selectionB: () => [],
      selectionC: () => [],
    }
    const state = reducer(getSelectionMap, action, oldState)
    const expectedState = {
      selectionA: init(),
      selectionB: init(),
      selectionC: init(),
    }
    expect(state).to.deep.equal(expectedState)
  })

  it('should initialize state for every subkey if state is undefined', () => {
    const oldState = undefined
    const action = {
      type: 'UNKNOWN_TYPE',
    }
    const getSelectionMap = {
      selectionA: () => [
        '1',
        '2',
      ],
      selectionB: () => [
        '2',
        '3',
      ],
    }
    const state = reducer(getSelectionMap, action, oldState)
    const expectedState = {
      selectionA: init(),
      selectionB: init(),
    }
    expect(state).to.deep.equal(expectedState)
  })

  it('should return old state if action has unknown selection name', () => {
    const oldState = 'oldState'
    const action = {
      type: RANGE_TO,
      payload: {
        selectionName: 'selectionUnknown',
      },
    }
    const state = reducer({ selectionA: () => {} }, action, oldState)
    expect(state).to.deep.equal(oldState)
  })

  it('should not throw error if payload is undefined', () => {
    const oldState = 'oldState'
    const action = {
      type: RANGE_TO,
    }
    const reducerCall = () => {
      reducer({ selectionA: () => {} }, action, oldState)
    }
    expect(reducerCall).to.not.throw(Error)
  })
})
