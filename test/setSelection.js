import { expect } from 'chai'
import { reducer, bindToSelection } from '../src'

describe('setSelection', () => {
  it('should select nothing if no selectable items exists', () => {
    const { actions, selectors } = bindToSelection('my-selection')
    const state0 = undefined
    const state = reducer(state0, actions.setSelection(['A', 'B', 'C']))
    expect(selectors.getSelection(state)).to.deep.equal([])
  })

  it('should select only existing items', () => {
    const { actions, selectors } = bindToSelection('my-selection')
    const state0 = undefined
    const state1 = reducer(state0, actions.setItems(['A', 'C', 'D']))
    const state2 = reducer(state1, actions.setSelection(['A', 'B', 'C']))
    console.log('###', state2)
    expect(selectors.getSelection(state2)).to.deep.equal(['A', 'C'])
  })
})
