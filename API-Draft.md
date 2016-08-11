## usage

### reducer

```js
import { createStore, combineReducers } from 'redux'
import {reducer as yourchoiceReducer} from 'yourchoice-redux'

// add standard reducer to store
const store = createStore(combineReducers({
    // ... other reducers
    yourchoice: yourchoiceReducer
}))
```
### bind selection

```js
import {bindSelection} from 'yourchoice-redux'

// bind yourchoice to specific selection 
yourchoiceSelection = bindSelection('my-selection') 

/*
returns {   
    actions: {
        setSelectableItems,
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

### plugin a reducer

```js
import { createStore, combineReducers } from 'redux'
import {reducer as yourchoiceReducer} from 'yourchoice-redux'

const boundSetSelectableItemsActionCreator =  yourchoiceSelection.actions.setSelectableItems

const pluggedReducer = yourchoiceReducer.plugin((state, action) => {
    // is executed before the yourchoiceReducer
    // is called with the same state and action as the yourchoiceReducer
    // the yourchoiceReducer is called afterwards with the returned state and the same action
    if(action.type === 'SET_MY_LIST'){
       return yourchoiceReducer(state, boundSetSelectableItemsActionCreator(action.payload.myList)) 
    } else {
        return state
    }
    
})

// add standard reducer to store
const store = createStore(combineReducers({
    // ... other reducers
    yourchoice: pluggedReducer
}))
```

## use cases

### Simple use case 

Simple list, when list content is altered, the action contains all items.
The ListComponent is hijacking selectable items of the yourchoice state as own list state,
that avoids sync issues.

 
```js
import { createStore, combineReducers } from 'redux'
import { reducer as yourchoiceReducer, bindSelection } from 'yourchoice-redux'

const store = createStore(combineReducers({
    // ... other reducers
    yourchoice: yourchoiceReducer
}))

const myChoice = bindSelection()

// dipatch actions 

const myList = [1, 2, 5, 8]
store.dispatch(myChoice.actions.setSelectableItems(myList))

// ...
store.dispatch(myChoice.actions.replace(2))

// connect to ReactComponent
 
const mapStateToProps = (state) => {
  return {
    myList: myChoice.selectors.getSelectableItems(state.yourchoice),
    mySelection: myChoice.selectors.getSelectedItems(state.yourchoice)
  }
} 
```

### extend simple use case by syncing selectable items through other actions

add plugged custom reducer for partial updates of yourchoice selectableItems.
the reducer listen to custom actions and update the yourchoice reducer state

```js
import { createStore, combineReducers } from 'redux'
import { reducer as yourchoiceReducer, bindSelection } from 'yourchoice-redux'

const updateSelectableItemsReducerFactory = (getSelectableItems, setSelectableItemsActionCreator) => (state, action) => {
    if(action.type === 'ADD_ITEM'){
        let myList = getSelectableItems(state)
        let addAction =  setSelectableItemsActionCreator(myList.slice().push(action.payload.id))
        return yourchoiceReducer(state, addAction)
    } else if(action.type === 'REMOVE_ITEM'){
        let myList = getSelectableItems(state)
        let removeAction =  setSelectableItemsActionCreator(myList.filter((item) => item !== action.payload.id))
        return yourchoiceReducer(state, removeAction)
    } else {
        return state
    }
}

const myChoice = bindSelection()

const pluggedReducer =  yourchoiceReducer.plugin(updateSelectableItemsReducerFactory(
    myChoice.selectors.getSelectableItems, 
    myChoice.actions.setSelectableItems))
    

// add reducer to store
const store = createStore(combineReducers({
    // ... other reducers
    yourchoice: pluggedReducer
}))
```

###  use custom selector and action sniffer for updates of selectable items

list of selectable items is part of a custom action 

```js
import { createStore, combineReducers } from 'redux'
import { reducer as yourchoiceReducer, bindSelection } from 'yourchoice-redux'

const store = createStore(combineReducers({
    // ... other reducers
    yourchoice: yourchoiceReducer
}))


// write a custom action marker
const markActionAsAlterSelectableItems = (action) => {
     action.meta.changesSelection = true;
     return action;
}

// dispatch an action that is changing the selectable items
store.dispatch( markActionAsAlterSelectableItems( customActionCreator() )

// depends on concrete actions and payload of another module (BAD, but possible)
const updateSelectableItemsReducerFactory = (setSelectableItemsActionCreator) => (state, action) => {
    if(action.meta.changesSelection) {
        let setItemsAction =  setSelectableItemsActionCreator(action.payload.item_list)
        return yourchoiceReducer(state, setItemsAction)
    } else {
        return state
    }
}

const myChoice = bindSelection()

const pluggedReducer =  yourchoiceReducer.plugin(updateSelectableItemsReducerFactory(
    myChoice.actions.setSelectableItems)
    

// add pluggedReducer to store

```