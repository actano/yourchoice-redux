import { expect } from 'chai'
import { bindToSelection, reducer } from '../src'

describe('removeAll - remove all items from selection', () => {
  let getChangedDeselection = null
  let getChangedSelection = null
  let getSelection = null
  let setItems = null
  let setSelection = null
  let removeAll = null

  before(() => {
    ({
      actions: { setItems, removeAll, setSelection },
      selectors: { getSelection, getChangedSelection, getChangedDeselection },
    } = bindToSelection('my-selection'))
  })

  it('should remove all selected items', () => {
    const state1 = reducer(undefined, setItems(['A', 'B', 'C']))
    const state2 = reducer(state1, setSelection(['A', 'C']))
    const state3 = reducer(state2, removeAll())
    expect(getSelection(state3)).to.deep.equal([])
    expect(getChangedSelection(state3)).to.deep.equal([])
    expect(getChangedDeselection(state3)).to.have.members(['A', 'C'])
  })
})
