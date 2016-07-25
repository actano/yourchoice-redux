import assert from 'assert'
import { replace } from 'yourchoice'
import { namespace } from './constants'

function replaceSelection(selectionName, itemId) {
  return {
    type: `${namespace}REPLACE_SELECTION`,
    payload: {
      selectionName,
      itemId,
    },
  }
}

const replaceSelectionReducer = ({ itemId }, currentSelection) => {
  assert(itemId, `no item id ('${itemId}') to replace`)

  return replace(itemId, currentSelection)
}

module.exports = {
  replaceSelection,
  replaceSelectionReducer,
}
