import { expect } from 'chai'
import { bindToSelection, reducer } from '../src'

describe('getChangedDeselection - get new selected items', () => {
  let setItems = null
  let getChangedDeselection = null

  before(() => {
    ({
      actions: { setItems },
      selectors: { getChangedDeselection },
    } = bindToSelection('my-selection'))
  })

  it('should return empty list on undefined state', () => {
    expect(getChangedDeselection(undefined)).to.deep.equal([])
  })

  it('should return empty list on undefined selection state', () => {
    const state = reducer(undefined, setItems(['A', 'B', 'C']))
    const otherApi = bindToSelection('other-selection')
    expect(otherApi.selectors.getChangedDeselection(state)).to.deep.equal([])
  })

  context('ignoring and preventing external changes', () => {
    it('should return same items after modification of previously got item list', () => {
      const state = reducer(undefined, undefined)
      const gotItems = getChangedDeselection(state)
      expect(gotItems).to.deep.equal([])
      gotItems.unshift('newOne')
      expect(gotItems).to.deep.equal(['newOne'])
      expect(getChangedDeselection(state)).to.deep.equal([])
    })
  })
})
