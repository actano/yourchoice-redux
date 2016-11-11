import { expect } from 'chai'
import flow from 'lodash/flow'
import curryReducer from './utils/curryReducer'
import { bindToSelection, reducer } from '../src'

describe('toggle - toggle selection of single item', () => {
  let getChangedDeselection = null
  let getChangedSelection = null
  let getSelection = null
  let setItems = null
  let setSelection = null
  let toggle = null

  before(() => {
    ({
      actions: { setItems, setSelection, toggle },
      selectors: { getChangedSelection, getChangedDeselection, getSelection },
    } = bindToSelection('my-selection'))
  })

  it('should toogle selection of given item', () => {
    const curriedReducer = curryReducer(reducer)

    const state = flow(
      curriedReducer(setItems(['A', 'B', 'C'])),
      curriedReducer(setSelection(['A', 'B', 'C'])),
      curriedReducer(toggle('B')),
    )(undefined)

    expect(getSelection(state)).to.have.members(['A', 'C'])
    expect(getChangedSelection(state)).to.deep.equal([])
    expect(getChangedDeselection(state)).to.deep.equal(['B'])
  })
})
