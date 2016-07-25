import {
  has,
  curry,
  flow,
  update,
} from 'lodash/fp'
import { init, setItems } from 'yourchoice'

import { rangeToSelectionReducer } from './rangeTo'
import { removeSelectionReducer } from './remove'
import { removeAllSelectionReducer } from './removeAll'
import { replaceSelectionReducer } from './replace'
import { toggleSelectionReducer } from './toggle'
import { namespace } from './constants'

const reducerMap = {}
reducerMap[`${namespace}RANGE_TO_SELECTION`] = rangeToSelectionReducer
reducerMap[`${namespace}REMOVE_SELECTION`] = removeSelectionReducer
reducerMap[`${namespace}REMOVE_ALL_SELECTION`] = removeAllSelectionReducer
reducerMap[`${namespace}REPLACE_SELECTION`] = replaceSelectionReducer
reducerMap[`${namespace}TOGGLE_SELECTION`] = toggleSelectionReducer

const reducer = curry((getSelectionMap, action, state) => {
  if (action.error) {
    return state
  }
  const selectionName = action.payload.selectionName

  if (has(action.type, reducerMap) && has(selectionName, getSelectionMap)) {
    const selectableItems = getSelectionMap[selectionName]()

    return update(
      selectionName,
      flow(
        (maybeDefinedState) => (maybeDefinedState || init()),
        setItems(selectableItems),
        curry(reducerMap[action.type])(action.payload)
      ),
      state || {}
    )
  }
  return state
})

export default reducer
