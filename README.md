# yourchoice-redux

[![npm](https://img.shields.io/npm/v/yourchoice-redux.svg)](https://www.npmjs.com/package/yourchoice-redux)
[![code style: actano](https://img.shields.io/badge/code%20style-actano-blue.svg)](https://www.npmjs.com/package/eslint-config-actano)
[![Build Status](https://travis-ci.org/actano/yourchoice-redux.svg?branch=master)](https://travis-ci.org/actano/yourchoice-redux)
[![codecov](https://codecov.io/gh/actano/yourchoice-redux/branch/master/graph/badge.svg)](https://codecov.io/gh/actano/yourchoice-redux)
[![Dependency Status](https://david-dm.org/actano/yourchoice-redux.svg)](https://david-dm.org/actano/yourchoice-redux)
[![devDependency Status](https://david-dm.org/actano/yourchoice-redux/dev-status.svg)](https://david-dm.org/actano/yourchoice-redux#info=devDependencies)

Redux wrapper for [yourchoice](https://github.com/actano/yourchoice).

# Get started

## How to use
```js
// You can use these actionTypes to add your own reducers to react to the provided actions
import {bind: bindYourchoice, actionTypes} from 'yourchoice-redux'

// You have to provide these selectors, which return the selectable items 
// for the different selections you want to support
itemSelectorMap = {
    selectionA: getItemsForSelectionA,
    selectionB: getItemsForSelectionB,
    ...
}

// This selector has to return the substate where yourchoice-redux lives
// It's required for the provided selectors to work on your top level state
substateSelector = state => state.selection

// Only do this once
yourchoice = bindYourchoice(substateSelector, itemSelectorMap)

// Integrate the provided sub reducer into yours
// As your items might be derived from any part of your state,
// the reducer requires read access to your top level state
function reducer(topLevelState, action, state) {
    return Object.assign({}, state, {
        ...
        // selection reducer should come after other reducers it might depend on, e.g. reducers that might change the outcome of the item selectors above
        selection: yourchoice.reducer(topLevelState, action, state),
        ...
    })
}

// Get actions and selectors specific for a selection
selectionA = yourchoice('selectionA')
->
{   
    actions: {
        toggle,
        rangeTo,
        ...
    },
    selectors: {
        getSelectedItems,
        ...
    }
}


```
