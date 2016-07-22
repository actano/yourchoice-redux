import assert from 'assert'
import { replace } from 'yourchoice'

function replaceSelection(selectionName, itemId) {
  return {
    type: 'REPLACE_SELECTION',
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
