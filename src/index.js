import { rangeToActionCreator as rangeTo } from './rangeTo'
import { removeActionCreator as remove } from './remove'
import { removeAllActionCreator as removeAll } from './removeAll'
import { replaceActionCreator as replace } from './replace'
import { toggleActionCreator as toggle } from './toggle'
import * as actionTypes from './actionTypes'
import reducer from './reducer'

const actions = {
  rangeTo,
  remove,
  removeAll,
  replace,
  toggle,
}

export {
  actions,
  actionTypes,
  reducer,
}
