import { expect } from 'chai'
import flow from 'lodash/flow'
import curryReducer from './utils/curryReducer'
import { bindToSelection, reducer } from '../src'

describe('replace - replace whole selection by single item', () => {
  let getChangedDeselection = null
  let getChangedSelection = null
  let getSelection = null
  let setItems = null
  let setSelection = null
  let replace = null

  before(() => {
    ({
      actions: { replace, setItems, setSelection },
      selectors: { getChangedSelection, getChangedDeselection, getSelection },
    } = bindToSelection('my-selection'))
  })

  it('should replace selection by given item', () => {
    const curriedReducer = curryReducer(reducer)

    const state = flow(
      curriedReducer(setItems(['A', 'B', 'C'])),
      curriedReducer(setSelection(['A', 'C'])),
      curriedReducer(replace('C'))
    )(undefined)

    expect(getSelection(state)).to.deep.equal(['C'])
    expect(getChangedSelection(state)).to.deep.equal([])
    expect(getChangedDeselection(state)).to.deep.equal(['A'])
  })
})
