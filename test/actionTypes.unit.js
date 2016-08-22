import { expect } from 'chai'
import { actionTypes } from '../src'

describe('action types - type ids of all actions', () => {
  it('should return action types of all actions', () => {
    expect(actionTypes).to.have.property('RANGE_TO')
    expect(actionTypes).to.have.property('REMOVE')
    expect(actionTypes).to.have.property('REMOVE_ALL')
    expect(actionTypes).to.have.property('REPLACE')
    expect(actionTypes).to.have.property('SET_ITEMS')
    expect(actionTypes).to.have.property('SET_SELECTION')
    expect(actionTypes).to.have.property('TOGGLE')
  })
})
