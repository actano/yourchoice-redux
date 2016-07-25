/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai'
import flow from 'lodash/flow'
import bind from 'lodash/bind'
import { init, setItems, toggle, setSelection } from 'yourchoice'
import { reducer, actions } from '../src'

const boundToggleSelection = bind(actions.toggle, null, 'selectionA')

describe('toggle', () => {
  describe('action', () => {
    it('should return action including type and payload', () => {
      const action = boundToggleSelection('rowA')

      expect(action).to.have.property('type', 'yourchoice-redux/TOGGLE')
      expect(action.payload).to.deep.equal({
        selectionName: 'selectionA',
        itemId: 'rowA',
      })
    })
  })

  describe('reducer', () => {
    it('should toggle unselected tree row to be selected', () => {
      const items = ['rowA', 'rowB', 'rowC']
      const initialState = { selectionA: flow(
                init,
                setItems(items),
                setSelection(['rowB', 'rowC'])
            )() }
      const action = boundToggleSelection('rowA')
      const getSelectionMap = {
        selectionA: () => items,
      }
      const state = reducer(getSelectionMap, action, initialState)

      expect(state.selectionA).to.deep.equal(toggle('rowA', initialState.selectionA))
    })

    it('should toggle selected tree row to be unselected', () => {
      const items = ['rowA', 'rowB', 'rowC']
      const initialState = { selectionA: flow(
                init,
                setItems(items),
                setSelection(['rowA', 'rowB', 'rowC'])
            )() }
      const action = boundToggleSelection('rowA')
      const getSelectionMap = {
        selectionA: () => items,
      }
      const state = reducer(getSelectionMap, action, initialState)

      expect(state.selectionA).to.deep.equal(toggle('rowA', initialState.selectionA))
    })
  })
})
