import { expect } from 'chai'

import { reducer, bindToSelection } from '../src'

describe('api', () => {
  it('should set items', () => {
    const boundSelection = bindToSelection('my-selection')

    const state = reducer(state, boundSelection.actions.setItems(['foo']))

    expect(boundSelection.selectors.getItems(state)).to.deep.equal(['foo'])
    expect(boundSelection.selectors.getSelection(state)).to.deep.equal([])
  })

  it('should select a single item', () => {
    const boundSelection = bindToSelection('my-selection')

    let state
    state = reducer(state, boundSelection.actions.setItems([1, 2, 3]))
    state = reducer(state, boundSelection.actions.replace(2))

    expect(boundSelection.selectors.getItems(state)).to.deep.equal([1, 2, 3])
    expect(boundSelection.selectors.getSelection(state)).to.deep.equal([2])
  })

  it.skip('should return empty selection and item list when no action is dispatched yet', () => {
    const boundSelection = bindToSelection('my-selection')

    const state = undefined

    expect(boundSelection.selectors.getItems(state)).to.deep.equal([])
    expect(boundSelection.selectors.getSelection(state)).to.deep.equal([])
  })
})

