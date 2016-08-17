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
    const state = reducer(action, oldState)
    expect(state).to.deep.equal(oldState)
  })

  it('should initialize state', () => {
    const oldState = undefined
    const action = {
      type: 'UNKNOWN_TYPE',
    }
    const state = reducer(action, oldState)
    expect(state).to.deep.equal({})
  })

  it('should return old state if action has unknown type', () => {
    const oldState = 'oldState'
    const action = {
      type: 'UNKNOWN_TYPE',
    }
    const state = reducer(action, oldState)
    expect(state).to.deep.equal(oldState)
  })

  it('should initialize substate on first action with a specific selection', () => {
    const oldState = {}
    const action = {
      type: 'UNKNOWN_TYPE',
      payload: {
        selectionName: 'newSelection',
      },
    }
    const state = reducer(action, oldState)
    expect(state).to.deep.equal({
      newSelection: init(),
    })
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
