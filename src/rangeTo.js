import assert from 'assert'
import { rangeTo } from 'yourchoice'
import { RANGE_TO } from './actionTypes'

function rangeToActionCreator(selectionName, itemId) {
  return {
    type: RANGE_TO,
    payload: {
      selectionName,
      itemId,
    },
  }
}

const rangeToReducer = ({ itemId }, currentSelection) => {
  assert(itemId, `no item id ('${itemId}') to range to`)

  return rangeTo(itemId, currentSelection)
}

export {
  rangeToActionCreator,
  rangeToReducer,
}
