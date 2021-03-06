import assert from 'assert'
import { replace } from 'yourchoice'
import { REPLACE } from './actionTypes'

const replaceActionCreator = (selectionName, itemId) => ({
  type: REPLACE,
  payload: {
    selectionName,
    itemId,
  },
})

const replaceReducer = ({ itemId }, currentSelection) => {
  assert(itemId, `No item id ('${itemId}') to replace`)

  return replace(itemId, currentSelection)
}

export {
  replaceActionCreator,
  replaceReducer,
}
