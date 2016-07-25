import assert from 'assert'
import { remove } from 'yourchoice'
import { namespace } from './constants'

function removeActionCreator(selectionName, itemId) {
  return {
    type: `${namespace}REMOVE`,
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
