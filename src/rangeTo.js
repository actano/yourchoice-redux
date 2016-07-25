import assert from 'assert'
import { curry } from 'lodash/fp'
import { rangeTo } from 'yourchoice'
import { RANGE_TO } from './actionTypes'

const rangeToActionCreator = curry((selectionName, itemId) => ({
  type: RANGE_TO,
  payload: {
    selectionName,
    itemId,
  },
}))

const rangeToReducer = ({ itemId }, currentSelection) => {
  assert(itemId, `No item id ('${itemId}') to range to`)

  return rangeTo(itemId, currentSelection)
}

export {
  rangeToActionCreator,
  rangeToReducer,
}
