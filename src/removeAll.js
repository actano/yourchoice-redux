import { removeAll } from 'yourchoice'
import { namespace } from './constants'

function removeAllActionCreator(selectionName) {
  return {
    type: `${namespace}REMOVE_ALL`,
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
