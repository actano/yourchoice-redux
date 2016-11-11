import { expect } from 'chai'
import flow from 'lodash/flow'
import curryReducer from './utils/curryReducer'
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
    const curriedReducer = curryReducer(reducer)

    const state = flow(
      curriedReducer(setItems(['A', 'B', 'C', 'D', 'E'])),
      curriedReducer(setSelection(['A', 'C', 'D', 'E'])),
      curriedReducer(remove(['A', 'D', 'F'])),
    )(undefined)

    expect(getSelection(state)).to.have.members(['C', 'E'])
    expect(getChangedSelection(state)).to.deep.equal([])
    expect(getChangedDeselection(state)).to.have.members(['A', 'D'])
  })
})
