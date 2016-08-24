import { expect } from 'chai'
import merge from 'lodash/merge'
import { actionTypes, bindToSelection, reducer } from '../src'

describe('reducer', () => {
  it('should return initialized state on initial undefined state', () => {
    expect(reducer(undefined, { type: 'any-action' })).to.not.be.undefined
  })

  it('should return same state on undefined action', () => {
    expect(reducer('any-state', undefined)).to.equal('any-state')
  })

  it('should return same state on action with error flag', () => {
    const { actions: { setItems } } = bindToSelection('my-selection')
    const action = setItems(['A', 'B', 'C'])
    action.error = true

    expect(reducer('any-state', action)).to.equal('any-state')
  })

  it('should return same state on action without payload', () => {
    const action = { type: actionTypes.SET_ITEMS }

    expect(reducer('any-state', action)).to.equal('any-state')
  })

  it('should return same state on action of unknown type', () => {
    const { actions: { setItems } } = bindToSelection('my-selection')

    const unknownAction = modifyActionType(setItems(['A', 'B', 'C']))

    const state1 = reducer(undefined, setItems([]))
    const state2 = reducer(state1, unknownAction)

    expect(state2).to.equal(state1)
  })

  it('should return same state on action without payload content (no selection binding)', () => {
    const action = { type: actionTypes.REPLACE_ALL, payload: {} }

    expect(reducer('any-state', action)).to.equal('any-state')
  })

  function modifyActionType(action) {
    // need to alienate a correct action (instead of creating a foreign action)
    // to get 100% coverage on reducer

    return merge({}, action, {
      type: 'UNKNOWN_TYPE',
    })
  }
})
