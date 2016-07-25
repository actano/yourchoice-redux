import { rangeToSelection } from './rangeTo'
import { removeSelection } from './remove'
import { removeAllSelection } from './removeAll'
import { replaceSelection } from './replace'
import { toggleSelection } from './toggle'
import reducer from './reducer'

const actions = {
  rangeToSelection,
  removeSelection,
  removeAllSelection,
  replaceSelection,
  toggleSelection,
}

export {
  actions,
  reducer,
}
