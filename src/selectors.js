import {
  getSelection,
  getChangedSelection,
  getChangedDeselection,
  getItems,
  init,
} from 'yourchoice'

const defaultState = (state) => {
  if (state === null || state === undefined) {
    return init()
  }

  return state
}

const withDefaultState = selector => state => selector(defaultState(state))

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
