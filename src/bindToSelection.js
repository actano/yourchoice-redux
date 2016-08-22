import { flow, curry, get, mapValues } from 'lodash/fp'
import { bind } from 'lodash'

const _bindSelector = curry((selectionName, selector) =>
  flow(
    get(selectionName),
    selector
  )
)

const bindToSelection = (actions, selectors) => (selectionName = 'selection') => {
  const boundActions = mapValues(
    (actionCreator) => bind(actionCreator, null, selectionName),
    actions
  )
  const boundSelectors = mapValues(
    _bindSelector(selectionName),
    selectors
  )
  return {
    actions: boundActions,
    selectors: boundSelectors,
  }
}

export default bindToSelection
