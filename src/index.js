import curry from 'lodash/fp/curry'
import has from 'lodash/has'
import flow from 'lodash/fp/flow'
import update from 'lodash/fp/update'
import {init, setItems} from 'yourchoice'

import {rangeToSelection, rangeToSelectionReducer} from './rangeTo'
import {removeSelection, removeSelectionReducer} from './remove'
import {removeAllSelection, removeAllSelectionReducer} from './removeAll'
import {replaceSelection, replaceSelectionReducer} from './replace'
import {toggleSelection, toggleSelectionReducer} from './toggle'

const actions = {
    rangeToSelection,
    removeSelection,
    removeAllSelection,
    replaceSelection,
    toggleSelection
}

const reducerMap = {
    RANGE_TO_SELECTION: rangeToSelectionReducer,
    REMOVE_SELECTION: removeSelectionReducer,
    REMOVE_ALL_SELECTION: removeAllSelectionReducer,
    REPLACE_SELECTION: replaceSelectionReducer,
    TOGGLE_SELECTION: toggleSelectionReducer
}

const reducer = curry ((getSelectionMap, action, currentState) => {
    if(action.error) {
        return currentState
    }
    const selectionName = action.payload.selectionName

    if(has(reducerMap, action.type) &&  has(getSelectionMap, selectionName)) {
        const selectableItems = getSelectionMap[selectionName]()


        const state = currentState ? currentState : {}

        return update(
            selectionName,
            flow(
                (state) => {return state ? state : init()},
                setItems(selectableItems),
                curry(reducerMap[action.type])(action.payload)
            ),
            state
        )
    } else return state
})

module.exports = {
    actions,
    reducer
}
