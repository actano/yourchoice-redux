/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai'
import flow from 'lodash/flow'
import bind from 'lodash/bind'
import { init, setItems, replace, setSelection } from 'yourchoice'
import { reducer, actions } from '../src'

const boundReplace = bind(actions.replace, null, 'selectionA')

describe('replace', () => {
  describe('action', () => {
    it('should return action including type and payload', () => {
      const action = boundReplace('itemA')

      expect(action).to.have.property('type', 'yourchoice-redux/REPLACE')
      expect(action.payload).to.deep.equal({
        selectionName: 'selectionA',
        itemId: 'itemA',
      })
    })
  })

  describe('reducer', () => {
    let initialState = null

    beforeEach(() => {
      initialState = {
        selectionA: flow(
                    init,
                    setItems(['itemA', 'itemB', 'itemC']),
                    setSelection(['itemC', 'itemB'])
                )(),
      }
    })

    it('should replace empty state with selection', () => {
      const getSelectionMap = {
        selectionA: () => [],
      }

      const action = boundReplace('itemA')
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
        selectionA: () => ['itemA', 'itemB', 'itemC'],
      }

      const action = boundReplace('itemA')
      const state = reducer(getSelectionMap, action, initialState)

      const expectedState =
                replace('itemA', initialState.selectionA)

      expect(state.selectionA).to.deep.equal(expectedState)
    })

    it('should update list of items and then update selection', () => {
      const getSelectionMap = {
        selectionA: () => ['itemA', 'itemB', 'itemC', 'itemD'],
      }

      const action = boundReplace('itemD')
      const state = reducer(getSelectionMap, action, initialState)

      const expectedState = flow(
                setItems(['itemA', 'itemB', 'itemC', 'itemD']),
                replace('itemD')
            )(initialState.selectionA)

      expect(state.selectionA).to.deep.equal(expectedState)
    })
  })
})
