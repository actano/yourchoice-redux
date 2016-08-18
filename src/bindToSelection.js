import { flow, curry, get, mapValues } from 'lodash/fp'
import { bind } from 'lodash'

const _bindSelector = curry((selectionName, selector) =>
  flow(
    get(selectionName),
    selector
  )
)

const bindToSelection = curry((actions, selectors, selectionName) => {
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
})

export default bindToSelection
