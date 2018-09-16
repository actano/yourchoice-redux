import { flow, get } from 'lodash/fp'
import { bind } from 'lodash'

const _bindSelector = (selectionName, selector) =>
  flow(
    get(selectionName),
    selector,
  )

const bindToSelection = (actions, selectors) => (selectionName = 'selection') => {
  const boundActions = {}
  const mapFn = actionCreator => bind(actionCreator, null, selectionName)
  for (const key of Object.keys(actions)) {
    boundActions[key] = mapFn(actions[key])
  }
  const boundSelectors = {}
  for (const key of Object.keys(selectors)) {
    boundSelectors[key] = _bindSelector(selectionName, selectors[key])
  }
  return {
    actions: boundActions,
    selectors: boundSelectors,
  }
}

export default bindToSelection
