import assert from 'assert'
import {toggle} from 'yourchoice'

const toggleSelection = (selectionName, itemId) => {
    return {
        type: 'TOGGLE_SELECTION',
        payload: {
            selectionName,
            itemId
        }
    }
}

const toggleSelectionReducer = ({itemId}, currentSelection) => {
    assert(itemId, `no item id ('${itemId}') to toggle`)

    return toggle(itemId, currentSelection)
}

module.exports = {
    toggleSelection,
    toggleSelectionReducer
}
