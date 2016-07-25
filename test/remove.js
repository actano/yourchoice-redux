/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai'
import flow from 'lodash/flow'
import bind from 'lodash/bind'
import { init, setItems, remove, setSelection } from 'yourchoice'
import { reducer, actions } from '../src'

const { removeSelection } = actions
const boundRemoveSelection = bind(removeSelection, null, 'selectionA')

describe('removeSelection', () => {
  describe('action', () => {
    it('should return action including type and payload', () => {
      const action = boundRemoveSelection('itemA')

      expect(action).to.have.property('type', 'yourchoice-redux/REMOVE_SELECTION')
      expect(action.payload).to.deep.equal({
        selectionName: 'selectionA',
        itemId: 'itemA',
      })
    })
  })

  describe('reducer', () => {
    it('should remove item from selection on empty state', () => {
      const getSelectionMap = {
        selectionA: () => ['itemA', 'itemB', 'itemC'],
      }

      const action = boundRemoveSelection('itemA')
      const state = reducer(getSelectionMap, action, undefined)

      const expectedState = flow(
                init,
                setItems(['itemA', 'itemB', 'itemC']),
                remove('itemA')
            )()

      expect(state.selectionA).to.deep.equal(expectedState)
    })

    it('should remove item from selection', () => {
      const initialState = { selectionA: flow(
                init,
                setItems(['itemA', 'itemB', 'itemC']),
                setSelection(['itemC', 'itemB'])
            )() }
      const getSelectionMap = {
        selectionA: () => ['itemA', 'itemB', 'itemC'],
      }

      const action = boundRemoveSelection('itemB')
      const state = reducer(getSelectionMap, action, initialState)

      const expectedState =
                remove('itemB', initialState.selectionA)

      expect(state.selectionA).to.deep.equal(expectedState)
    })

    it('should update list of items and then update selection', () => {
      const initialState = { selectionA: flow(
                init,
                setItems(['itemA', 'itemB', 'itemC', 'itemD']),
                setSelection(['itemC', 'itemB'])
            )() }
      const getSelectionMap = {
        selectionA: () => ['itemA', 'itemB', 'itemC'],
      }

      const action = boundRemoveSelection('itemD')
      const state = reducer(getSelectionMap, action, initialState)

      const expectedState = flow(
                setItems(['itemA', 'itemB', 'itemC']),
                remove('itemD')
            )(initialState.selectionA)

      expect(state.selectionA).to.deep.equal(expectedState)
    })
  })
})
