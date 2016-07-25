import assert from 'assert'
import { toggle } from 'yourchoice'
import { TOGGLE } from './actionTypes'

function toggleActionCreator(selectionName, itemId) {
  return {
    type: TOGGLE,
    payload: {
      selectionName,
      itemId,
    },
  }
}

const toggleReducer = ({ itemId }, currentSelection) => {
  assert(itemId, `no item id ('${itemId}') to toggle`)

  return toggle(itemId, currentSelection)
}

export {
  toggleActionCreator,
  toggleReducer,
}
