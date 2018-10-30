import { expect } from 'chai'
import flow from 'lodash/flow'
import curryReducer from './utils/curryReducer'
import { bindToSelection, reducer } from '../src'

describe('bindToSelection - get API, bound to given selection name', () => {
  it('should return all action creators and selectors', () => {
    const boundAPI = bindToSelection('my-selection')
    expect(boundAPI.actions).to.be.an('object')
    expect(boundAPI.selectors).to.be.an('object')

    const { actions, selectors } = boundAPI

    expect(actions.rangeTo).to.be.a('function')
    expect(actions.remove).to.be.a('function')
    expect(actions.removeAll).to.be.a('function')
    expect(actions.replace).to.be.a('function')
    expect(actions.setItems).to.be.a('function')
    expect(actions.setSelection).to.be.a('function')
    expect(actions.toggle).to.be.a('function')

    expect(selectors.getChangedDeselection).to.be.a('function')
    expect(selectors.getChangedSelection).to.be.a('function')
    expect(selectors.getItems).to.be.a('function')
    expect(selectors.getSelection).to.be.a('function')
  })

  it('should separate states of different name bindings', () => {
    const curriedReducer = curryReducer(reducer)
    const boundApiA = bindToSelection('sel-A')
    const boundApiB = bindToSelection('sel-B')

    const state = flow(
      curriedReducer(boundApiA.actions.setItems(['A', 'B', 'C'])),
      curriedReducer(boundApiB.actions.setItems(['X', 'Y', 'Z'])),
    )(undefined)

    expect(boundApiA.selectors.getItems(state)).to.deep.equal(['A', 'B', 'C'])
    expect(boundApiB.selectors.getItems(state)).to.deep.equal(['X', 'Y', 'Z'])
  })

  it('should bind to selection name `selection` if no name is given', () => {
    const boundApiA = bindToSelection()
    const boundApiB = bindToSelection('selection')
    const state = reducer(undefined, boundApiA.actions.setItems(['A', 'B', 'C']))

    expect(boundApiB.selectors.getItems(state)).to.deep.equal(['A', 'B', 'C'])
  })
})
