import assert from 'assert'
import { toggle } from 'yourchoice'
import { namespace } from './constants'

function toggleActionCreator(selectionName, itemId) {
  return {
    type: `${namespace}TOGGLE`,
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

export {
  toggleActionCreator,
  toggleSelectionReducer,
}
