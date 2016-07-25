import curry from 'lodash/fp/curry'
import has from 'lodash/has'
import flow from 'lodash/fp/flow'
import update from 'lodash/fp/update'
import { init, setItems } from 'yourchoice'

import { rangeToSelection, rangeToSelectionReducer } from './rangeTo'
import { removeSelection, removeSelectionReducer } from './remove'
import { removeAllSelection, removeAllSelectionReducer } from './removeAll'
import { replaceSelection, replaceSelectionReducer } from './replace'
import { toggleSelection, toggleSelectionReducer } from './toggle'
import { namespace } from './constants'

const actions = {
  rangeToSelection,
  removeSelection,
  removeAllSelection,
  replaceSelection,
  toggleSelection,
}

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

  if (has(reducerMap, action.type) && has(getSelectionMap, selectionName)) {
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

export {
  actions,
  reducer,
}
