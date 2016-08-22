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
const mySelection = bindToSelection('my-selection');
/*
returns {
    actions: {
        setItems,
        rangeTo,
        remove,
        ...
    },
    selectors: {
        getSelection,
        getChangedSelection,
        ...
    }
}
*/
```

### Selectors

Selectors need to be given the substate the reducer acts on.

```js
export {
    getItems: (state) => mySelection.selectors.getItems(state.yourchoice)
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
    myList: selection.selectors.getItems(state.yourchoice),
    mySelection: selection.selectors.getSelection(state.yourchoice)
  }
}

// dipatch actions
store.dispatch(selection.actions.setItems([1, 2, 5, 8]))
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
const getSelectedUsers = (state) => userSelection.selectors.getSelection(state.yourchoice)

// get action creators and selectors bound to selection name 'teams'
const teamSelection = bindToSelection('teams');
...
```

## API
* <a href="#_reducer"><code>reducer(state, action)</code></a>
* <a href="#_bindToSelection"><code>bindToSelection(selectionName)</code></a>
* <a href="#_action_rangeTo">action creator: <code>rangeTo(toItem)</code></a>
* <a href="#_action_remove">action creator: <code>remove(itemsToRemove)</code></a>
* <a href="#_action_removeAll">action creator: <code>removeAll()</code></a>
* <a href="#_action_replace">action creator: <code>replace(item)</code></a>
* <a href="#_action_setItems">action creator: <code>setItems(selectableItems)</code></a>
* <a href="#_action_setSelection">action creator: <code>setSelection(selectedItems)</code></a>
* <a href="#_action_toggle">action creator: <code>toggle(item)</code></a>
* <a href="#_selector_getChangedSelection">selector: <code>getChangedSelection(state)</code></a>
* <a href="#_selector_getChangedDeselection">selector: <code>getChangedDeselection(state)</code></a>
* <a href="#_selector_getItems">selector: <code>getItems(state)</code></a>
* <a href="#_selector_getSelection">selector: <code>getSelection(state)</code></a>

<h3>common types used in API specification</h3>
```javascript
type State = any;
type Item = any;
type Action = any;
```

<h3 id="_reducer">reducer</h3>
```javascript
reducer(state: State, action: Action): State
```
Standard signature reducer, which can be added anywhere in your reducer hierarchy.

<h3 id="_bindToSelection">bindToSelection</h3>
```javascript
bindToSelection(selectionName: string = 'selection'): BoundAPI

type BoundAPI = {
    actions: ActionCreators;
    selectors: Selectors;
};

type ActionCreators = {
    rangeTo: (item: Item) => Action;
    remove: (items: Item[]) => Action;
    removeAll: () => Action;
    replace: (item: Item) => Action;
    setItems: (items: Item[]) => Action;
    setSelection: (items: Item[]) => Action;
    toggle: (item: Item) => Action;
};

type Selectors = {
    getChangedSelection: (state: State) => Item[];
    getChangedDeselection: (state: State) => Item[];
    getItems: (state: State) => Item[];
    getSelection: (state: State) => Item[];
};
```
`bindToSelection` returns an object containing all the following action creators and selectors, bound to the given selection name.

<h3 id="_action_rangeTo">action creator: rangeTo</h3>
```javascript
rangeTo(item: Item): Action
```
Selects a range of items usally starting from the previously [toggled](#actionstoggleitem--action) or [replaced](#actionsreplaceitem--action) item and ending at the given `item`. This is equivalent to a shift+click by the user in a file manager.

<h3 id="_action_remove">action creator: remove</h3>
```javascript
remove(items: Item[]): Action
```
Removes the given `items` from the current selection. 

<h3 id="_action_removeAll">action creator: removeAll</h3>
```javascript
removeAll(): Action
```
Removes all items from the current selection.

<h3 id="_action_replace">action creator: replace</h3>
```javascript
replace(item: Item): Action
```
Replaces the current selection with the given `item`. Also defines this item as the starting point for a subsequent [`rangeTo()`](#actionsrangeto--action) selection. This is equivalent to a simple click by the user in a file manager.

<h3 id="_action_setItems">action creator: setItems</h3>
```javascript
setItems(selectableItems: Item[]): Action;
```
Changes the current set of items that can be selected/deselected.

The `selectableItems` can be **any [javascript iterable](http://www.ecma-international.org/ecma-262/6.0/#sec-iterable-interface)**. 
This enables yourchoice to operate on any data structure. Native data types such as `Array` or `Map` implement the iterable protocol.

This action is usually dispatched initially before any selection is performed. This action should be called in order to update the state when selectable items have been added or removed. For example, if some of the currently selected items are not present in the given `selectableItems` anymore, then these items will be automatically removed from the current selection.

Consider using a store middleware or saga to do this.

<h3 id="_action_setSelection">action creator: setSelection</h3>
```javascript
setSelection(selectedItems: Item[]): Action
```
Replaces the current selection with the given `items`.

<h3 id="_action_toggle">action creator: toggle</h3>
```javascript
toggle(item: Item): Action
```
Adds or removes the given `item` to/from the selection. Other currently selected items are not affected. Also defines this item as the starting point for a subsequent [`rangeTo()`](#actionsrangeto--action) selection if it is added to the selection. This is equivalent to an alt+click (cmd+click) by the user in a file manager.

<h3 id="_selector_getItems">selector: getItems</h3>
```javascript
getItems(state: State): Item[]
```
Returns an array containing all selectable items.

<h3 id="_selector_getSelection">selector: getSelection</h3>
```javascript
getSelection(state: State): Item[]

```
Returns an array containing the currently selected items.

<h3 id="_selector_getChangedSelection">selector: getChangedSelection</h3>
```javascript
getChangedSelection(state: State): Item[]
```
Returns an array containing those items that have been added to the selection by the directly preceding operation. E.g. calling this after a call to [`rangeTo()`](#actionsrangeto--action) will return all the items that have been added to the selection by this operation.

<h3 id="_selector_getChangedDeselection">selector: getChangedDeselection</h3>
```javascript
getChangedDeselection(state: State): Item[]
```
Returns an array containing those items that have been removed from the selection by the directly preceding operation. E.g. calling this after a call to [`rangeTo()`](#actionsrangeto--action) will return all the items that have been removed from the selection by this operation.
