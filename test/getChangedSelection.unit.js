import { expect } from 'chai'
import { bindToSelection, reducer } from '../src'

describe('getChangedSelection - get new selected items', () => {
  let setItems = null
  let getChangedSelection = null

  before(() => {
    ({
      actions: { setItems },
      selectors: { getChangedSelection },
    } = bindToSelection('my-selection'))
  })

  it('should return empty list on undefined state', () => {
    expect(getChangedSelection(undefined)).to.deep.equal([])
  })

  it('should return empty list on undefined selection state', () => {
    const state = reducer(undefined, setItems(['A', 'B', 'C']))
    const otherApi = bindToSelection('other-selection')

    expect(otherApi.selectors.getChangedSelection(state)).to.deep.equal([])
  })

  context('ignoring and preventing external changes', () => {
    it('should return same items after modification of previously got item list', () => {
      const state = reducer(undefined, undefined)
      const gotItems = getChangedSelection(state)

      expect(gotItems).to.deep.equal([])

      gotItems.unshift('newOne')

      expect(getChangedSelection(state)).to.deep.equal([])
    })
  })
})
