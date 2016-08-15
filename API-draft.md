## API draft

### reducer

yourchoice provides a global reducer with a standard signature (state, action) => nextState

    import { createStore, combineReducers } from 'redux'

    import {reducer as yourchoiceReducer} from 'yourchoice-redux'

    // connect to store. mount point must be yourchoice
    const store = createStore(combineReducers({
        // ... other reducers
        yourchoice: myChoice.reducer
    }))

### bindSelection

bindSelection returns an object that contains the yourchoice actions and selectors bound to a specific selection

    import {bindSelection} from 'yourchoice-redux'

    // bind yourchoice to specific selection name
    // if the selectionName is omitted it defaults to 'selection'
    const yourchoiceSelection = bindSelection('my-selection'); 
    /*
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

## Examples

### simple use case
 
    import { createStore, combineReducers } from 'redux'
    import { bindSelection } from 'yourchoice-redux'
    
    const myChoice = bindSelection()

    // connect to store
    const store = createStore(combineReducers({
        // ... other reducers
        yourchoice: myChoice.reducer
    }))
    
    // dipatch actions 
    
    const myList = [1, 2, 5, 8]
    store.dispatch(myChoice.actions.setItems(myList))
    
    // ...
    store.dispatch(myChoice.actions.replace(2))
    
    // connect to ReactComponent
     
    const mapStateToProps = (state) => {
      return {
        myList: myChoice.selectors.getSelectableItems(state.yourchoice),
        mySelection: myChoice.selectors.getSelectedItems(state.yourchoice)
      }
    } 
 
### bind more than one selection
 
    // add global reducer to store at mountpoint yourchoice (see above)

    // module users
    const userSelection = bindSelection('users'); 
    ...
    store.dispatch(userSelection.actions.setItems(userList));
    ...
    store.dispatch(userSelection.actions.replace('user-id-1'));
    ...
    // get selector
    const getSelectedUsers = userSelection.selectors.getSelectedItems

    // module teams
    const teamSelection = bindSelection('teams'); 
    ...
    // dito

### sync yourchoice selectable items with state at a different mountpoint
 
    // add global reducer to store at mountpoint yourchoice (see above)

    // module users
    const userSelection = bindSelection('users');
    ...
    store.dispatch(userSelection.actions.replace('userId-1'));
    store.dispatch(userSelection.actions.rangeTo('userId-4'));
    ...
    // get selector
    const getSelectedUsers = userSelection.selectors.getSelectedItems

 
    // logic for syncing the selectable items (e.g. sorted user list)

    // action marker to identify actions that alters the list of users  
    const actionMarker = (action) =>  {
        action.meta.changeSelection = 'pos'
        return action
    }
    const isActionMarked = (action) =>  {
        return action.meta.changeSelection === 'pos'
    }
 
    // dispatch an action that alters the selectable items
    store.dispatch(actionMarker(addUserAction))

    // custom toplevel sync reducer
    const setItems = userSelection.actions.setItems
    const reducerFactory = (getSortedUserList) => (toplevelState, action) =>
        if isActionMarked(action) {
            let userList = getSortedUserList(toplevelState)
            let action = setItems(userList)
            toplevelState.updateIn(['yourchoice'], (state) => yourchoiceReducer(state, action)
        }
    const syncReducer = reducerFactory(getSortedUserList)

    // add the syncReducer to the store at toplevel state
 