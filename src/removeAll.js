import { removeAll } from 'yourchoice'

function removeAllSelection(selectionName) {
  return {
    type: 'REMOVE_ALL_SELECTION',
    payload: {
      selectionName,
    },
  }
}

function removeAllSelectionReducer(payload, currentSelection) {
  return removeAll(currentSelection)
}

module.exports = {
  removeAllSelection,
  removeAllSelectionReducer,
}
