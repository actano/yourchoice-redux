import { expect } from 'chai'
import { bindToSelection, reducer } from '../src'

describe('rangeTo - range selection', () => {
  let getChangedDeselection = null
  let getChangedSelection = null
  let getSelection = null
  let rangeTo = null
  let setItems = null
  let toggle = null

  before(() => {
    ({
      actions: { rangeTo, setItems, toggle },
      selectors: { getSelection, getChangedSelection, getChangedDeselection },
    } = bindToSelection('my-selection'))
  })

  it('should select range from anchor to given item', () => {
    const state1 = reducer(undefined, setItems(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']))
    const state2 = reducer(state1, toggle('I'))
    const state3 = reducer(state2, toggle('E'))
    const state4 = reducer(state3, toggle('A'))
    const state5 = reducer(state4, toggle('C'))
    const state6 = reducer(state5, rangeTo('G'))
    expect(getSelection(state)).to.have.members(['A', 'C', 'D', 'E', 'F', 'G', 'I'])
    expect(getChangedSelection(state)).to.have.members(['D', 'F', 'G'])
    expect(getChangedDeselection(state)).to.have.members([])
  })
})
