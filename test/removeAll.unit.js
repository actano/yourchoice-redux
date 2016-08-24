import { expect } from 'chai'
import flow from 'lodash/flow'
import curryReducer from './utils/curryReducer'
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
    const curriedReducer = curryReducer(reducer)

    const state = flow(
      curriedReducer(setItems(['A', 'B', 'C'])),
      curriedReducer(setSelection(['A', 'C'])),
      curriedReducer(removeAll())
    )(undefined)

    expect(getSelection(state)).to.deep.equal([])
    expect(getChangedSelection(state)).to.deep.equal([])
    expect(getChangedDeselection(state)).to.have.members(['A', 'C'])
  })
})
