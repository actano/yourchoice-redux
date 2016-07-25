import assert from 'assert'
import { remove } from 'yourchoice'
import { namespace } from './constants'

function removeSelection(selectionName, itemId) {
  return {
    type: `${namespace}REMOVE`,
    payload: {
      selectionName,
      itemId,
    },
  }
}

const removeSelectionReducer = ({ itemId }, currentSelection) => {
  assert(itemId, `no item id ('${itemId}') to remove`)
  return remove(itemId, currentSelection)
}

export {
  removeSelection,
  removeSelectionReducer,
}
