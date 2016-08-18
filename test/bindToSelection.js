import { expect } from 'chai'
import { bindToSelection } from '../src'
import { init, setItems } from 'yourchoice'

describe('bindToSelection', () => {
  let boundYourchoice = undefined

  beforeEach(() => {
    boundYourchoice = bindToSelection('selectionA')
  })

  it('should add selectionName to payload of actions', () => {
    const testAction = boundYourchoice.actions.removeAll()
    expect(testAction).to.have.deep.property('payload.selectionName', 'selectionA')
  })

  it('should make selectors act on the bound selection', () => {
    const testState = {
      selectionA: setItems(['A', 'B', 'C'], init()),
      selectionB: setItems([], init()),
    }
    const testSelector = boundYourchoice.selectors.getItems

    expect(testSelector(testState)).to.deep.equal(['A', 'B', 'C'])
  })
})
