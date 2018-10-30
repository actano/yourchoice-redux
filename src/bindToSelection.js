const _bindSelector = (selectionName, selector) =>
  state => selector(state ? state[selectionName] : undefined)

const bindToSelection = (actions, selectors) => (selectionName = 'selection') => {
  const boundActions = {}
  for (const key of Object.keys(actions)) {
    const actionCreator = actions[key]
    boundActions[key] = (...param) => actionCreator(selectionName, ...param)
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
