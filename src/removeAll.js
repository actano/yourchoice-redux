import { removeAll } from 'yourchoice'
import { namespace } from './constants'

function removeAllSelection(selectionName) {
  return {
    type: `${namespace}REMOVE_ALL`,
    payload: {
      selectionName,
    },
  }
}

function removeAllSelectionReducer(payload, currentSelection) {
  return removeAll(currentSelection)
}

export {
  removeAllSelection,
  removeAllSelectionReducer,
}
