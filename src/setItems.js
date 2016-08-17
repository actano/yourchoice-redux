import assert from 'assert'
import { curry } from 'lodash/fp'
import { setItems } from 'yourchoice'
import { SET_ITEMS } from './actionTypes'

const setItemsActionCreator = curry((selectionName, items) => ({
  type: SET_ITEMS,
  payload: {
    selectionName,
    items,
  },
}))

const setItemsReducer = ({ items }, currentSelection) => {
  assert(items, 'No items to set')
  return setItems(items, currentSelection)
}

export {
  setItemsActionCreator,
  setItemsReducer,
}
