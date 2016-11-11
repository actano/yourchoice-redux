import { expect } from 'chai'
import flow from 'lodash/flow'
import curryReducer from './utils/curryReducer'
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
    const curriedReducer = curryReducer(reducer)

    const state = flow(
      curriedReducer(setItems(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'])),
      curriedReducer(toggle('I')),
      curriedReducer(toggle('E')),
      curriedReducer(toggle('A')),
      curriedReducer(toggle('C')),
      curriedReducer(rangeTo('G')),
    )(undefined)

    expect(getSelection(state)).to.have.members(['A', 'C', 'D', 'E', 'F', 'G', 'I'])
    expect(getChangedSelection(state)).to.have.members(['D', 'F', 'G'])
    expect(getChangedDeselection(state)).to.have.members([])
  })
})
