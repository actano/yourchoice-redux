import assert from 'assert'
import { curry } from 'lodash/fp'
import { toggle } from 'yourchoice'
import { TOGGLE } from './actionTypes'

const toggleActionCreator = curry((selectionName, itemId) => ({
  type: TOGGLE,
  payload: {
    selectionName,
    itemId,
  },
}))

const toggleReducer = ({ itemId }, currentSelection) => {
  assert(itemId, `No item id ('${itemId}') to toggle`)

  return toggle(itemId, currentSelection)
}

export {
  toggleActionCreator,
  toggleReducer,
}
