## API proposal

### reducer

yourchoice provides a global reducer with a standard signature (state, action) => nextState

    import {reducer as yourchoiceReducer} from 'yourchoice-redux'

### bindSelection

bindSelection returns an object that contains the yourchoice actions and selectors bound to a specific selection

    import {bindSelection} from 'yourchoice-redux'

    // bind yourchoice to specific selection 
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

### reducer plugin

    import {reducer as yourchoiceReducer} from 'yourchoice-redux'
    
    const pluggedReducer = yourchoiceReducer.plugin(additionalReducer)
    
reducer.plugin returns a yourchoice reducer that will also pass each action through additional reducers specified. 
The additional reducers should be a function with a standard reducer signature: (state, action) => nextState.
The additional reducers is executed before the yourchoice reducer.

### reducer action sync sniffer

    import {reducer as yourchoiceReducer} from 'yourchoice-redux'
    
    const syncSniffer = yourchoiceReducer.syncSniffer(mapReducerToMountpoint, selectableItemsSelector)    
    /* 
    returns {
        actionMarker,
        reducer
    } 
    */
    
reducer.syncSniffer returns an object that contains an actionMarker and a yourchoice reducer.
the syncSniffer reducer is looking for actions that are marked by the actionMarker and for every marked action
the yourchoice selectable items are set by the values returned from the specified selector.

the specified selectable items selector should be a standard selector that returns a list of items: (state) => listOfItems

typically the selector needs a different state mount point than the reducer. Therefore the syncSniffer reducer has to map 
the yourchoice reducer to a different mount point. the function mapReducerToMountpoint do this job,
it takes a reducer function and returns a reducer function. It maps and update the state to the right mount point. 
A standard implementation could be:
 
    const  mapReducerToMountpoint = (reducer) =>  {
        (state, action) => {
            state['yourchoice'] = reducer(state['yourchoice'], action)
            return state;
        }
    }
    
### Open question

Should we have one global yourchoice-redux reducer or one reducer for every selection ?

Drawback of a global reducer is that you have to pass the reducer through every module that is using yourchoice 
 in case it is decorating the reducer by a plugin.
 
In case we implement the action sniffer reducer decorator the question is answered! 
Because the yourchoice reducer is bound to a different mountpoint the concept of a global reducer do not work anymore.

In case of one reducer per selection the API will look like

    import {bindSelection} from 'yourchoice-redux'
    // bind yourchoice to specific selection 
    const yourchoiceSelection = bindSelection('my-selection'); 
    /*
    returns {
        actions,
        selectors,
        reducer
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
 
### plugin reducer

the plugged in reducer operates on the same state as the yourchoice reducer and listens to
custom actions. The custom actions keeping the yourchoice selectable items in sync with the app state.

    import { createStore, combineReducers } from 'redux'
    import { bindSelection } from 'yourchoice-redux'

    const myChoice = bindSelection()

    const updateSelectableItemsReducerFactory = (setItems, reducer) => (state, action) => {
        if(action.type === 'SET_MY_LIST'){
            let action =  setItems(action.payload.my_list)
            return reducer(state, action)
        } else {
            return state
        }
    }

    const pluggedReducer =  myChoice.reducer.plugin(updateSelectableItemsReducerFactory(
        myChoice.actions.setItems,
        myChoice.reducer
    ))

    // add reducer to store
    const store = createStore(combineReducers({
        // ... other reducers
        yourchoice: pluggedReducer
    }))

### action sniffer reducer

lets assume we bind the yourchoice reducer to the top level state and map the selection state to the 
mountpoint `yourchoice` and the selectable item list is derived from a state at the mountpoint `somewhere` and
the state is implemented with immutable-js

    import { bindSelection } from 'yourchoice-redux'

    const myChoice = bindSelection()

    const  mapReducerToMountpoint = (mountPoint) => (reducer) =>  {
        (state, action) => {
            return state.updateIn(mountPoint) = reducer(state.getIn(mountPoint), action)
        }
    }

    const getSelectableItemsSelector = (state) =>
        return someReselectSelector(state.getIn(['somewhere']))

    const syncSniffer =  myChoice.reducer.syncSniffer(
        mapReducerToMountpoint(['yourchoice']),
        getSelectableItemsSelector
    )

    // add the syncSniffer.reducer to your store at top level state
    
    // whenever dispatching an action that alters the selectable items list, mark this action
    // by the returned action marker

    store.dispatch(syncSniffer.actionMarker(someAlteringAction))
