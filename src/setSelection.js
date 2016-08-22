import assert from 'assert'
import { setSelection } from 'yourchoice'
import { SET_SELECTION } from './actionTypes'

const setSelectionActionCreator = (selectionName, items) => ({
  type: SET_SELECTION,
  payload: {
    selectionName,
    items,
  },
})

const setSelectionReducer = ({ items }, currentSelection) => {
  assert(items, 'No selection items to set')
  return setSelection(items, currentSelection)
}

export {
  setSelectionActionCreator,
  setSelectionReducer,
}
