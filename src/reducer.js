import {
  has,
  curry,
  flow,
  update,
} from 'lodash/fp'
import { init, setItems } from 'yourchoice'

import { rangeToReducer } from './rangeTo'
import { removeReducer } from './remove'
import { removeAllReducer } from './removeAll'
import { replaceReducer } from './replace'
import { toggleReducer } from './toggle'
import {
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
}

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
