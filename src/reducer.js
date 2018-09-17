import { init } from 'yourchoice'

import { setItemsReducer } from './setItems'
import { rangeToReducer } from './rangeTo'
import { removeReducer } from './remove'
import { removeAllReducer } from './removeAll'
import { replaceReducer } from './replace'
import { setSelectionReducer } from './setSelection'
import { toggleReducer } from './toggle'
import {
  SET_ITEMS,
  RANGE_TO,
  REMOVE,
  REMOVE_ALL,
  REPLACE,
  SET_SELECTION,
  TOGGLE,
} from './actionTypes'

const reducerMap = {
  [RANGE_TO]: rangeToReducer,
  [REMOVE]: removeReducer,
  [REMOVE_ALL]: removeAllReducer,
  [REPLACE]: replaceReducer,
  [TOGGLE]: toggleReducer,
  [SET_SELECTION]: setSelectionReducer,
  [SET_ITEMS]: setItemsReducer,
}

const reducer = (state = {}, action) => {
  let nextState = state
  if (!action || action.error || !action.payload || !action.payload.selectionName) {
    return nextState
  }
  const selectionName = action.payload.selectionName
  if (!(selectionName in nextState)) {
    nextState = Object.assign({}, nextState, { [selectionName]: init() })
  }

  if (reducerMap[action.type]) {
    const updater = value => reducerMap[action.type](action.payload, value)
    return Object.assign({}, nextState, { [selectionName]: updater(nextState[selectionName]) })
  }
  return nextState
}

export default reducer
