import assert from 'assert'
import { remove } from 'yourchoice'
import { REMOVE } from './actionTypes'

function removeActionCreator(selectionName, itemId) {
  return {
    type: REMOVE,
    payload: {
      selectionName,
      itemId,
    },
  }
}

const removeReducer = ({ itemId }, currentSelection) => {
  assert(itemId, `no item id ('${itemId}') to remove`)
  return remove(itemId, currentSelection)
}

export {
  removeActionCreator,
  removeReducer,
}
