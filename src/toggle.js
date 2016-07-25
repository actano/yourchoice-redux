import assert from 'assert'
import { toggle } from 'yourchoice'
import { namespace } from './constants'

function toggleSelection(selectionName, itemId) {
  return {
    type: `${namespace}TOGGLE_SELECTION`,
    payload: {
      selectionName,
      itemId,
    },
  }
}

const toggleSelectionReducer = ({ itemId }, currentSelection) => {
  assert(itemId, `no item id ('${itemId}') to toggle`)

  return toggle(itemId, currentSelection)
}

module.exports = {
  toggleSelection,
  toggleSelectionReducer,
}
