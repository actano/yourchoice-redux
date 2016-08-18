# yourchoice-redux

[![npm](https://img.shields.io/npm/v/yourchoice-redux.svg)](https://www.npmjs.com/package/yourchoice-redux)
[![code style: actano](https://img.shields.io/badge/code%20style-actano-blue.svg)](https://www.npmjs.com/package/eslint-config-actano)
[![Build Status](https://travis-ci.org/actano/yourchoice-redux.svg?branch=master)](https://travis-ci.org/actano/yourchoice-redux)
[![codecov](https://codecov.io/gh/actano/yourchoice-redux/branch/master/graph/badge.svg)](https://codecov.io/gh/actano/yourchoice-redux)
[![Dependency Status](https://david-dm.org/actano/yourchoice-redux.svg)](https://david-dm.org/actano/yourchoice-redux)
[![devDependency Status](https://david-dm.org/actano/yourchoice-redux/dev-status.svg)](https://david-dm.org/actano/yourchoice-redux#info=devDependencies)

Redux wrapper for [yourchoice](https://github.com/actano/yourchoice).

## How to use

### Reducer

Yourchoice provides a reducer with a standard signature `(state, action) => nextState`.

```js
import {createStore, combineReducers} from 'redux'

import {reducer as yourchoiceReducer} from 'yourchoice-redux'

// connect to store, mount point must be yourchoice
const store = createStore(combineReducers({
    // ... other reducers
    yourchoice: yourchoiceReducer
}))
```

### Bind to selection

`bindToSelection` returns an object that contains the `yourchoice` actions and selectors bound to a specific selection.

```js
import {bindToSelection} from 'yourchoice-redux'

// bind yourchoice to specific selection name
// if the selectionName is omitted it defaults to 'selection'
const mySelection = bindToSelection('my-selection');    /*
returns {
    actions: {
        setItems,
        toggle,
        rangeTo,
        ...
    },
    selectors: {
        getSelectableItems
        getSelectedItems,
        ...
    }
}
*/
```

### Selectors

Selectors need to be given the substate the reducer acts on.

```js
export {
    getSelectableItems: (state) => mySelection.selectors.getSelectableItems(state.yourchoice)
}
```

## Examples

### Simple use case
```js
import {createStore, combineReducers} from 'redux'
import {bindToSelection, reducer as yourchoiceReducer} from 'yourchoice-redux'
const selection = bindToSelection()

// connect to store
const store = createStore(combineReducers({
    // ... other reducers
    yourchoice: yourchoiceReducer
}))

// connect to ReactComponent
const mapStateToProps = (state) => {
  return {
    myList: selection.selectors.getSelectableItems(state.yourchoice),
    mySelection: selection.selectors.getSelectedItems(state.yourchoice)
  }
}

// dipatch actions
store.dispatch(yourchoice.actions.setItems([1, 2, 5, 8]))
store.dispatch(selection.actions.replace(2))

```

### Bind more than one selection
```js
// add global reducer to store at mountpoint yourchoice (see above)

// get action creators and selectors bound to selection name 'users'
const userSelection = bindToSelection('users');

...
store.dispatch(userSelection.actions.setItems(userList));
store.dispatch(userSelection.actions.replace('user-id-1'));
...
// get selector
const getSelectedUsers = (state) => userSelection.selectors.getSelectedItems(state.yourchoice)

// get action creators and selectors bound to selection name 'teams'
const teamSelection = bindToSelection('teams');
...
```
