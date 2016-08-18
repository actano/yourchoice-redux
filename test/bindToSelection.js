import { expect } from 'chai'
import { bindToSelection } from '../src'
import { init, setItems } from 'yourchoice'

describe('bindToSelection', () => {
  it('should add selectionName to payload of actions', () => {
    const boundYourchoice = bindToSelection('selectionA')
    const testAction = boundYourchoice.actions.removeAll()
    expect(testAction).to.have.deep.property('payload.selectionName', 'selectionA')
  })

  it('should make selectors act on the bound selection', () => {
    const boundYourchoice = bindToSelection('selectionA')
    const testState = {
      selectionA: setItems(['A', 'B', 'C'], init()),
      selectionB: setItems([], init()),
    }
    const testSelector = boundYourchoice.selectors.getItems

    expect(testSelector(testState)).to.deep.equal(['A', 'B', 'C'])
  })

  it('should default selectionName to to selection', () => {
    const boundYourchoice = bindToSelection()
    const testAction = boundYourchoice.actions.removeAll()

    expect(testAction).to.have.deep.property('payload.selectionName', 'selection')
  })
})
