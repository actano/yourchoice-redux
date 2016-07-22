/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import {expect} from 'chai'
import flow from 'lodash/flow'
import bind from 'lodash/bind'
import {init, setItems, replace, setSelection} from 'yourchoice'
import yourchoiceRedux from '../src'

const {actions:{replaceSelection}, reducer} = yourchoiceRedux
const boundReplaceSelection = bind(replaceSelection, null, 'selectionA')

describe('replaceSelection', () => {
    describe('action', () => {
        it('should return action including type and payload', () => {
            const action = boundReplaceSelection('itemA')

            expect(action).to.have.property('type', 'REPLACE_SELECTION')
            expect(action.payload).to.deep.equal({
                selectionName: 'selectionA',
                itemId: 'itemA'
            })
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

        it('should replace empty state with selection', () => {
            const getSelectionMap = {
                selectionA: () => []
            }

            const action = boundReplaceSelection('itemA')
            const state = reducer(getSelectionMap, action, undefined)

            const expectedState = flow(
                init,
                setItems([]),
                replace('itemA')
            )()

            expect(state.selectionA).to.deep.equal(expectedState)
        })

        it('should replace existing selection', () => {
            const getSelectionMap = {
                selectionA: () => ['itemA', 'itemB', 'itemC']
            }

            const action = boundReplaceSelection('itemA')
            const state = reducer(getSelectionMap, action, initialState)

            const expectedState =
                replace('itemA', initialState.selectionA)

            expect(state.selectionA).to.deep.equal(expectedState)
        })

        it('should update list of items and then update selection', () => {
            const getSelectionMap = {
                selectionA: () => ['itemA', 'itemB', 'itemC', 'itemD']
            }

            const action = boundReplaceSelection('itemD')
            const state = reducer(getSelectionMap, action, initialState)

            const expectedState = flow(
                setItems(['itemA', 'itemB', 'itemC', 'itemD']),
                replace('itemD')
            )(initialState.selectionA)

            expect(state.selectionA).to.deep.equal(expectedState)
        })
    })
})
