import { setItemsActionCreator as setItems } from './setItems'
import { rangeToActionCreator as rangeTo } from './rangeTo'
import { removeActionCreator as remove } from './remove'
import { removeAllActionCreator as removeAll } from './removeAll'
import { replaceActionCreator as replace } from './replace'
import { setSelectionActionCreator as setSelection } from './setSelection'
import { toggleActionCreator as toggle } from './toggle'
import * as actionTypes from './actionTypes'
import reducer from './reducer'
import * as selectors from './selectors'
import _bindToSelection from './bindToSelection'

const actions = {
  setItems,
  rangeTo,
  remove,
  removeAll,
  replace,
  setSelection,
  toggle,
}

const bindToSelection = _bindToSelection(actions, selectors)

export {
  actionTypes,
  reducer,
  bindToSelection,
}
