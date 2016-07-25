/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai'
import reducer from '../src/reducer'
import { namespace } from '../src/constants'

describe('reducer', () => {
  it('should return old state if action contains error', () => {
    const oldState = 'oldState'
    const action = {
      error: 'testError',
      payload: {},
    }
    const state = reducer({}, action, oldState)
    expect(state).to.deep.equal(oldState)
  })

  it('should return old state if action has unknown type', () => {
    const oldState = 'oldState'
    const action = {
      type: 'UNKNOWN_TYPE',
      payload: {},
    }
    const state = reducer({}, action, oldState)
    expect(state).to.deep.equal(oldState)
  })

  it('should return old state if action has unknown selection name', () => {
    const oldState = 'oldState'
    const action = {
      type: `${namespace}RANGE_TO_SELECTION`,
      payload: {
        selectionName: 'selectionUnknown',
      },
    }
    const state = reducer({ selectionA: () => {} }, action, oldState)
    expect(state).to.deep.equal(oldState)
  })
})
