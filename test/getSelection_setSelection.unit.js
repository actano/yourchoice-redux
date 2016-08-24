import { expect } from 'chai'
import flow from 'lodash/flow'
import curryReducer from './utils/curryReducer'
import { bindToSelection, reducer } from '../src'

describe('getSelection/setSelection - getting / manual setting the set of selected items', () => {
  let getSelection = null
  let setSelection = null
  let setItems = null
  let curriedReducer = null

  before(() => {
    ({
      actions: { setItems, setSelection },
      selectors: { getSelection },
    } = bindToSelection('my-selection'))

    curriedReducer = curryReducer(reducer)
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
    const state = flow(
      curriedReducer(setItems(['A', 'B', 'C'])),
      curriedReducer(setSelection(['A', 'C']))
    )(undefined)

    expect(getSelection(state)).to.have.members(['A', 'C'])
  })

  it('should replace all previously set items', () => {
    const state = flow(
      curriedReducer(setItems(['A', 'B', 'C'])),
      curriedReducer(setSelection(['A', 'C'])),
      curriedReducer(setSelection(['A', 'B']))
    )(undefined)

    expect(getSelection(state)).to.have.members(['A', 'B'])
  })

  it('should only select selectable items', () => {
    const state = flow(
      curriedReducer(setItems(['A', 'B', 'C'])),
      curriedReducer(setSelection(['A', 'C', 'D']))
    )(undefined)

    expect(getSelection(state)).to.have.members(['A', 'C'])
  })

  it('should remove not selectable items from selection permanently', () => {
    const state1 = flow(
      curriedReducer(setItems(['A', 'B', 'C'])),
      curriedReducer(setSelection(['A', 'C'])),
      curriedReducer(setItems(['B', 'C']))
    )(undefined)

    expect(getSelection(state1)).to.deep.equal(['C'])

    const state2 = reducer(state1, setItems(['A', 'B', 'C']))

    expect(getSelection(state2)).to.deep.equal(['C'])
  })

  context('ignoring and preventing external changes', () => {
    it('should return initial selected items after modification of original list', () => {
      const givenItems = ['A', 'C']
      const state = flow(
        curriedReducer(setItems(['A', 'B', 'C'])),
        curriedReducer(setSelection(givenItems))
      )(undefined)

      givenItems.unshift('B')
      expect(getSelection(state)).to.have.members(['A', 'C'])
    })

    it('should return given selection after modification of previously got selection', () => {
      const state = flow(
        curriedReducer(setItems(['A', 'B', 'C'])),
        curriedReducer(setSelection(['A', 'C']))
      )(undefined)

      const gotItems = getSelection(state)
      expect(gotItems).to.deep.equal(['A', 'C'])

      gotItems.unshift('B')
      expect(getSelection(state)).to.have.members(['A', 'C'])
    })
  })
})
