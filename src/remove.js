import assert from 'assert'
import { remove } from 'yourchoice'
import { REMOVE } from './actionTypes'

const removeActionCreator = (selectionName, itemId) => ({
  type: REMOVE,
  payload: {
    selectionName,
    itemId,
  },
})

const removeReducer = ({ itemId }, currentSelection) => {
  assert(itemId, `No item id ('${itemId}') to remove`)
  return remove(itemId, currentSelection)
}

export {
  removeActionCreator,
  removeReducer,
}
