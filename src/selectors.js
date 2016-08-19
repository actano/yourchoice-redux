import {
  getSelection,
  getChangedSelection,
  getChangedDeselection,
  getItems,
  init,
} from 'yourchoice'

import flow from 'lodash/flow'

function defaultState(state) {
  if (state === null || state === undefined) {
    return init()
  }

  return state
}

function withDefaultState(selector) {
  return flow(
    defaultState,
    selector
  )
}

const getSelectionDefault = withDefaultState(getSelection)
const getChangedSelectionDefault = withDefaultState(getChangedSelection)
const getChangedDeselectionDefault = withDefaultState(getChangedDeselection)
const getItemsDefault = withDefaultState(getItems)

export {
  getSelectionDefault as getSelection,
  getChangedSelectionDefault as getChangedSelection,
  getChangedDeselectionDefault as getChangedDeselection,
  getItemsDefault as getItems,
}
