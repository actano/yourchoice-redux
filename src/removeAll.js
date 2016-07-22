import {removeAll} from 'yourchoice'

const removeAllSelection = (selectionName) => {
    return {
        type: 'REMOVE_ALL_SELECTION',
        payload: {
            selectionName
        }
    }
}

const removeAllSelectionReducer = (payload, currentSelection) => {
    return removeAll(currentSelection)
}

module.exports = {
    removeAllSelection,
    removeAllSelectionReducer
}
