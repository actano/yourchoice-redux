import assert from 'assert'
import { replace } from 'yourchoice'
import { namespace } from './constants'

function replaceActionCreator(selectionName, itemId) {
  return {
    type: `${namespace}REPLACE`,
    payload: {
      selectionName,
      itemId,
    },
  }
}

const replaceReducer = ({ itemId }, currentSelection) => {
  assert(itemId, `no item id ('${itemId}') to replace`)

  return replace(itemId, currentSelection)
}

export {
  replaceActionCreator,
  replaceReducer,
}
