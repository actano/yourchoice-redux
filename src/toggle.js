import assert from 'assert'
import { toggle } from 'yourchoice'
import { TOGGLE } from './actionTypes'

const toggleActionCreator = (selectionName, itemId) => ({
  type: TOGGLE,
  payload: {
    selectionName,
    itemId,
  },
})

const toggleReducer = ({ itemId }, currentSelection) => {
  assert(itemId, `No item id ('${itemId}') to toggle`)

  return toggle(itemId, currentSelection)
}

export {
  toggleActionCreator,
  toggleReducer,
}
