import assert from 'assert'
import { rangeTo } from 'yourchoice'
import { RANGE_TO } from './actionTypes'

const rangeToActionCreator = (selectionName, itemId) => ({
  type: RANGE_TO,
  payload: {
    selectionName,
    itemId,
  },
})

const rangeToReducer = ({ itemId }, currentSelection) => {
  assert(itemId, 'No item id to range to')
  return rangeTo(itemId, currentSelection)
}

export {
  rangeToActionCreator,
  rangeToReducer,
}
