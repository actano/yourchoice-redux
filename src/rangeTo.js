import assert from 'assert'
import {rangeTo} from 'yourchoice'

const rangeToSelection = (selectionName, itemId) => {
    return {
        type: 'RANGE_TO_SELECTION',
        payload: {
            selectionName,
            itemId
        }
    }
}

const rangeToSelectionReducer = ({itemId}, currentSelection) => {
    assert(itemId, `no item id ('${itemId}') to range to`)

    return rangeTo(itemId, currentSelection)
}

module.exports = {
    rangeToSelection,
    rangeToSelectionReducer
}
