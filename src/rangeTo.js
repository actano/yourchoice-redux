import assert from 'assert'
import { rangeTo } from 'yourchoice'
import { namespace } from './constants'

function rangeToSelection(selectionName, itemId) {
  return {
    type: `${namespace}RANGE_TO_SELECTION`,
    payload: {
      selectionName,
      itemId,
    },
  }
}

const rangeToSelectionReducer = ({ itemId }, currentSelection) => {
  assert(itemId, `no item id ('${itemId}') to range to`)

  return rangeTo(itemId, currentSelection)
}

export {
  rangeToSelection,
  rangeToSelectionReducer,
}
