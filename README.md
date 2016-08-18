# yourchoice-redux

[![npm](https://img.shields.io/npm/v/yourchoice-redux.svg)](https://www.npmjs.com/package/yourchoice-redux)
[![code style: actano](https://img.shields.io/badge/code%20style-actano-blue.svg)](https://www.npmjs.com/package/eslint-config-actano)
[![Build Status](https://travis-ci.org/actano/yourchoice-redux.svg?branch=master)](https://travis-ci.org/actano/yourchoice-redux)
[![codecov](https://codecov.io/gh/actano/yourchoice-redux/branch/master/graph/badge.svg)](https://codecov.io/gh/actano/yourchoice-redux)
[![Dependency Status](https://david-dm.org/actano/yourchoice-redux.svg)](https://david-dm.org/actano/yourchoice-redux)
[![devDependency Status](https://david-dm.org/actano/yourchoice-redux/dev-status.svg)](https://david-dm.org/actano/yourchoice-redux#info=devDependencies)

Redux wrapper for [yourchoice](https://github.com/actano/yourchoice).

## Installing

### With npm

```javascript
npm install yourchoice-redux --save
```

Since yourchoice-redux is a frontend module, you will need a module bundler like webpack or browserify.

**Caution:** Yourchoice Redux uses `Symbol.iterator` which is not yet supported by all environments. You can polyfill it with `core-js`

```javascript
if (!window.Symbol) {
  require('core-js/es6/symbol')
}
```


## Usage

### Reducer

YourChoice Redux provides a reducer with a standard signature `(state, action) => nextState`.

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

## API

### reducer(state, action)

Standard signature reducer, which can be added anywhere in your reducer hierarchy.

### bindToSelection(selectionName = 'selection')

Returns an object containing all the following action creators and selectors, bound to the given selection name.

### actions.setItems(selectableItems) : Action

Changes the current set of items that can be selected/deselected.

The `selectableItems` can be **any [javascript iterable](http://www.ecma-international.org/ecma-262/6.0/#sec-iterable-interface)**. 
This enables yourchoice to operate on any data structure. Native data types such as `Array` or `Map` implement the iterable protocol.

This action is usually dispatched initially before any selection is performed. This action should be called in order to update the state when selectable items have been added or removed. For example, if some of the currently selected items are not present in the given `selectableItems` anymore, then these items will be automatically removed from the current selection.

Consider using a store middleware or saga to do this.

### actions.replace(item) : Action

Replaces the current selection with the given `item`. Also defines this item as the starting point for a subsequent [`rangeTo()`](#rangetoitem--action) selection. This is equivalent to a simple click by the user in a file manager.

### actions.toggle(item) : Action

Adds or removes the given `item` to/from the selection. Other currently selected items are not affected. Also defines this item as the starting point for a subsequent [`rangeTo()`](#rangetoitem--action) selection if it is added to the selection. This is equivalent to an alt+click (cmd+click) by the user in a file manager.

### actions.rangeTo() : Action

Selects a range of items usally starting from the previously [toggled](#toggleitem--action) or [replaced](#replaceitem--action) item and ending at the given `item`. This is equivalent to a shift+click by the user in a file manager.

### actions.setSelection(items) : Action

Replaces the current selection with the given `items`.

### actions.remove(items) : Action

Removes the given `items` from the current selection. 

### actions.removeAll() : Action

Removes all items from the current selection.

### selectors.getItems(state) : Array

Returns an array containing all selectable items.

### selectors.getSelection(state) : Array

Returns an array containing the currently selected items.

### selectors.getChangedSelection(state) : Array

Returns an array containing those items that have been added to the selection by the directly preceding operation. E.g. calling this after a call to [`rangeTo()`](#rangetoitem--action) will return all the items that have been added to the selection by this operation.

### selectors.getChangedDeselection(state) : Array

Returns an array containing those items that have been removed from the selection by the directly preceding operation. E.g. calling this after a call to [`rangeTo()`](#rangetoitem--action) will return all the items that have been removed from the selection by this operation.
