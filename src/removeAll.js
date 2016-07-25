import { removeAll } from 'yourchoice'
import { REMOVE_ALL } from './actionTypes'

function removeAllActionCreator(selectionName) {
  return {
    type: REMOVE_ALL,
    payload: {
      selectionName,
    },
  }
}

function removeAllReducer(payload, currentSelection) {
  return removeAll(currentSelection)
}

export {
  removeAllActionCreator,
  removeAllReducer,
}
