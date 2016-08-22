import { expect } from 'chai'
import orderBy from 'lodash/orderBy'
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
    const state1 = reducer(undefined, setItems(['A', 'B', 'C']))
    const state2 = reducer(state1, setSelection(['A', 'C']))
    const state3 = reducer(state2, replace('C'))
    expect(getSelection(state3)).to.deep.equal(['C'])
    expect(getChangedSelection(state3)).to.deep.equal([])
    expect(getChangedDeselection(state3)).to.deep.equal(['A'])
  })
})
