import { expect } from 'chai'
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
    const state1 = reducer(undefined, setItems(['A', 'B', 'C']))
    const state2 = reducer(state1, setSelection(['A', 'B', 'C']))
    const state3 = reducer(state2, toggle('B'))
    expect(getSelection(state3)).to.have.members(['A', 'C'])
    expect(getChangedSelection(state3)).to.deep.equal([])
    expect(getChangedDeselection(state3)).to.deep.equal(['B'])
  })
})
