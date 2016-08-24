import { expect } from 'chai'
import { bindToSelection, reducer } from '../src'

describe('getSelection/setSelection - getting / manual setting the set of selected items', () => {
  let getSelection = null
  let setSelection = null
  let setItems = null

  before(() => {
    ({
      actions: { setItems, setSelection },
      selectors: { getSelection },
    } = bindToSelection('my-selection'))
  })

  it('should return empty list on undefined state', () => {
    expect(getSelection(undefined)).to.deep.equal([])
  })

  it('should return empty list on undefined selection state', () => {
    const state = reducer(undefined, setItems(['A', 'B', 'C']))
    const otherApi = bindToSelection('other-selection')
    expect(otherApi.selectors.getSelection(state)).to.deep.equal([])
  })

  it('should return same items previously set', () => {
    const state1 = reducer(undefined, setItems(['A', 'B', 'C']))
    const state2 = reducer(state1, setSelection(['A', 'C']))
    expect(getSelection(state2)).to.have.members(['A', 'C'])
  })

  it('should replace all previously set items', () => {
    const state1 = reducer(undefined, setItems(['A', 'B', 'C']))
    const state2 = reducer(state1, setSelection(['A', 'C']))
    const state3 = reducer(state2, setSelection(['A', 'B']))
    expect(getSelection(state3)).to.have.members(['A', 'B'])
  })

  it('should only select selectable items', () => {
    const state1 = reducer(undefined, setItems(['A', 'B', 'C']))
    const state2 = reducer(state1, setSelection(['A', 'C', 'D']))
    expect(getSelection(state2)).to.have.members(['A', 'C'])
  })

  it('should remove not selectable items from selection permanently', () => {
    const state1 = reducer(undefined, setItems(['A', 'B', 'C']))
    const state2 = reducer(state1, setSelection(['A', 'C']))
    const state3 = reducer(state2, setItems(['B', 'C']))
    expect(getSelection(state3)).to.deep.equal(['C'])
    const state4 = reducer(state3, setItems(['A', 'B', 'C']))
    expect(getSelection(state4)).to.deep.equal(['C'])
  })

  context('ignoring and preventing external changes', () => {
    it('should return initial selected items after modification of original list', () => {
      const givenItems = ['A', 'C']
      const state1 = reducer(undefined, setItems(['A', 'B', 'C']))
      const state2 = reducer(state1, setSelection(givenItems))
      givenItems.unshift('B')
      expect(givenItems).to.deep.equal(['B', 'A', 'C'])
      expect(getSelection(state2)).to.have.members(['A', 'C'])
    })

    it('should return given selection after modification of previously got selection', () => {
      const state1 = reducer(undefined, setItems(['A', 'B', 'C']))
      const state2 = reducer(state1, setSelection(['A', 'C']))
      const gotItems = getSelection(state2)
      expect(gotItems).to.deep.equal(['A', 'C'])
      gotItems.unshift('B')
      expect(gotItems).to.deep.equal(['B', 'A', 'C'])
      expect(getSelection(state2)).to.have.members(['A', 'C'])
    })
  })
})
