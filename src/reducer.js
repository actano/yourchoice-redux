import {
  curry,
  flow,
  has,
  update,
} from 'lodash/fp'
import { mapValues } from 'lodash'
import { init, setItems } from 'yourchoice'

import { setItemsReducer } from './setItems'
import { rangeToReducer } from './rangeTo'
import { removeReducer } from './remove'
import { removeAllReducer } from './removeAll'
import { replaceReducer } from './replace'
import { toggleReducer } from './toggle'
import {
  SET_ITEMS,
  RANGE_TO,
  REMOVE,
  REMOVE_ALL,
  REPLACE,
  TOGGLE,
} from './actionTypes'

const reducerMap = {
  [RANGE_TO]: rangeToReducer,
  [REMOVE]: removeReducer,
  [REMOVE_ALL]: removeAllReducer,
  [REPLACE]: replaceReducer,
  [TOGGLE]: toggleReducer,
  [SET_ITEMS]: setItemsReducer,
}

const reducer = curry((getSelectionMap, action, oldState) => {
  let state = oldState
  if (!state) {
    state = mapValues(getSelectionMap, () => init())
  }
  if (action.error || !action.payload) {
    return state
  }
  const selectionName = action.payload.selectionName

  if (has(action.type, reducerMap) && has(selectionName, getSelectionMap)) {
    const selectableItems = getSelectionMap[selectionName]()

    return update(
      selectionName,
      flow(
        setItems(selectableItems),
        curry(reducerMap[action.type])(action.payload)
      ),
      state || {}
    )
  }
  return state
})

export default reducer
