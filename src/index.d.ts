export declare type State = any;
export declare type Item = any;
export declare type Action = any;

export declare type ActionCreators = {
    rangeTo: (item: Item) => Action;
    remove: (items: Item[]) => Action;
    removeAll: () => Action;
    replace: (item: Item) => Action;
    setItems: (items: Item[]) => Action;
    setSelection: (items: Item[]) => Action;
    toggle: (item: Item) => Action;
};

export declare type Selectors = {
    getItems: (state: State) => Item[];
    getSelection: (state: State) => Item[];
    getChangedSelection: (state: State) => Item[];
    getChangedDeselection: (state: State) => Item[];
};

export declare type BoundAPI = {
    actions: ActionCreators;
    selectors: Selectors;
};

declare const actionTypes: {
    RANGE_TO: string;
    REMOVE: string;
    REMOVE_ALL: string;
    REPLACE: string;
    SET_ITEMS: string;
    SET_SELECTION: string;
    TOGGLE: string;
};

declare function reducer(state: State, action: Action): State;
declare function bindToSelection(selectionName: string): BoundAPI;

export {
    actionTypes,
    reducer,
    bindToSelection
};
