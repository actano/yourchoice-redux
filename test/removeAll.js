/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import {expect} from 'chai'
import flow from 'lodash/flow'
import bind from 'lodash/bind'
import {init, setItems, removeAll, setSelection} from 'yourchoice'
import yourchoiceRedux from '../src'

const {actions:{removeAllSelection}, reducer} = yourchoiceRedux
const boundRemoveSelection = bind(removeAllSelection, null, 'selectionA')

describe('removeAllSelection', () => {
    describe('action', () => {
        it('should return action including type and payload', () => {
            const action = boundRemoveSelection()

            expect(action).to.have.property('type', 'REMOVE_ALL_SELECTION')
            expect(action.payload).to.deep.equal({selectionName: 'selectionA'})
        })
    })

    describe('reducer', () => {

        var initialState = null

        beforeEach(() => {
            initialState = {
                selectionA: flow(
                    init,
                    setItems(['itemA', 'itemB', 'itemC']),
                    setSelection(['itemC', 'itemB'])
                )()
            }
        })

        it('should return correct state with empty initial state', () => {
            const getSelectionMap = {
                selectionA: () => ['itemA', 'itemB', 'itemC']
            }

            const action = boundRemoveSelection()
            const state = reducer(getSelectionMap, action, undefined)

            const expectedState = flow(
                init,
                setItems(['itemA', 'itemB', 'itemC']),
                removeAll
            )()

            expect(state.selectionA).to.deep.equal(expectedState)
        })

        it('should remove all from selection', () => {
            const getSelectionMap = {
                selectionA: () => ['itemA', 'itemB', 'itemC']
            }

            const action = boundRemoveSelection()
            const state = reducer(getSelectionMap, action, initialState)

            const expectedState =
                removeAll(initialState.selectionA)

            expect(state.selectionA).to.deep.equal(expectedState)
        })

        it('should update list of items and then update selection', () => {
            const getSelectionMap = {
                selectionA: () => ['itemA', 'itemB', 'itemC', 'itemD']
            }

            const action = boundRemoveSelection()
            const state = reducer(getSelectionMap, action, initialState)

            const expectedState = flow(
                setItems(['itemA', 'itemB', 'itemC', 'itemD']),
                removeAll
            )(initialState.selectionA)

            expect(state.selectionA).to.deep.equal(expectedState)
        })
    })
})