/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai'
import flow from 'lodash/flow'
import bind from 'lodash/bind'
import { init, setItems, rangeTo } from 'yourchoice'
import yourchoiceRedux from '../src'

const { actions: { rangeToSelection }, reducer } = yourchoiceRedux
const boundRangeToSelection = bind(rangeToSelection, null, 'selectionA')

describe('rangeToSelection', () => {
  describe('action', () => {
    it('should return action including type and payload', () => {
      const action = boundRangeToSelection('itemA')
      expect(action).to.have.property('type', 'RANGE_TO_SELECTION')
      expect(action.payload).to.deep.equal({
        selectionName: 'selectionA',
        itemId: 'itemA',
      })
    })
  })

  describe('reducer', () => {
    it('should rangeTo a selectionA', () => {
      const getSelectionMap = {
        selectionA: () => ['itemA', 'itemB', 'itemC'],
      }

      const action = boundRangeToSelection('itemA')
      const state = reducer(getSelectionMap, action, undefined)

      const expectedState = flow(
                init,
                setItems(['itemA', 'itemB', 'itemC']),
                rangeTo('itemA')
            )()

      expect(state.selectionA).to.deep.equal(expectedState)
    })
  })
})
