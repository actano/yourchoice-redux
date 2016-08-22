import { expect } from 'chai'
import orderBy from 'lodash/orderBy'
import { bindToSelection, reducer } from '../src'

describe('remove - remove items from selection', () => {
  let getChangedDeselection = null
  let getChangedSelection = null
  let getSelection = null
  let setItems = null
  let setSelection = null
  let remove = null

  before(() => {
    ({
      actions: { setItems, remove, setSelection },
      selectors: { getSelection, getChangedSelection, getChangedDeselection },
    } = bindToSelection('my-selection'))
  })

  it('should remove all given items', () => {
    const state1 = reducer(undefined, setItems(['A', 'B', 'C', 'D', 'E']))
    const state2 = reducer(state1, setSelection(['A', 'C', 'D', 'E']))
    const state3 = reducer(state2, remove(['A', 'D', 'F']))
    expect(orderBy(getSelection(state3))).to.deep.equal(['C', 'E'])
    expect(getChangedSelection(state3)).to.deep.equal([])
    expect(orderBy(getChangedDeselection(state3))).to.deep.equal(['A', 'D'])
  })
})
