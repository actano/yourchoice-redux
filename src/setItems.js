import assert from 'assert'
import { setItems } from 'yourchoice'
import { SET_ITEMS } from './actionTypes'

const setItemsActionCreator = (selectionName, items) => ({
  type: SET_ITEMS,
  payload: {
    selectionName,
    items,
  },
})

const setItemsReducer = ({ items }, currentSelection) => {
  assert(items, 'No items to set')
  return setItems(items, currentSelection)
}

export {
  setItemsActionCreator,
  setItemsReducer,
}
