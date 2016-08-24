import { expect } from 'chai'
import flow from 'lodash/flow'
import curryReducer from './utils/curryReducer'
import { bindToSelection, reducer } from '../src'

describe('getItems/setItems - get/update the list of selectable items', () => {
  let setItems = null
  let getItems = null
  let curriedReducer = null

  before(() => {
    ({
      actions: { setItems },
      selectors: { getItems },
    } = bindToSelection('my-selection'))
    curriedReducer = curryReducer(reducer)
  })

  it('should return empty list on undefined state', () => {
    expect(getItems(undefined)).to.deep.equal([])
  })

  it('should return empty list on undefined selection state', () => {
    const state = reducer(undefined, setItems(['A', 'B', 'C']))
    const otherApi = bindToSelection('other-selection')

    expect(otherApi.selectors.getItems(state)).to.deep.equal([])
  })

  it('should return same items previously set', () => {
    const state = reducer(undefined, setItems(['A', 'B', 'C']))

    expect(getItems(state)).to.deep.equal(['A', 'B', 'C'])
  })

  it('should replace all previously set items', () => {
    const state = flow(
      curriedReducer(setItems(['A', 'B', 'C'])),
      curriedReducer(setItems(['X', 'Y', 'Z']))
    )(undefined)

    expect(getItems(state)).to.deep.equal(['X', 'Y', 'Z'])
  })

  context('ignoring and preventing external changes', () => {
    it('should return initial given items after modification of original given item list', () => {
      const givenItems = ['A', 'B', 'C']
      const state = reducer(undefined, setItems(givenItems))

      givenItems.unshift('newOne')

      expect(getItems(state)).to.deep.equal(['A', 'B', 'C'])
    })

    it('should return initial given items after modification of previously got item list', () => {
      const state = reducer(undefined, setItems(['A', 'B', 'C']))
      const gotItems = getItems(state)

      expect(gotItems).to.deep.equal(['A', 'B', 'C'])
      gotItems.unshift('newOne')

      expect(getItems(state)).to.deep.equal(['A', 'B', 'C'])
    })
  })
})
