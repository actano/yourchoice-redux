import { expect } from 'chai'
import flow from 'lodash/flow'
import bind from 'lodash/bind'
import { init, setItems, rangeTo } from 'yourchoice'
import { reducer } from '../src'
import { rangeToActionCreator } from '../src/rangeTo'

const boundRangeTo = bind(rangeToActionCreator, null, 'selectionA')

describe('rangeTo', () => {
  describe('action', () => {
    it('should return action including type and payload', () => {
      const action = boundRangeTo('itemA')
      expect(action).to.have.property('type', 'yourchoice-redux/RANGE_TO')
      expect(action.payload).to.deep.equal({
        selectionName: 'selectionA',
        itemId: 'itemA',
      })
    })
  })

  describe('reducer', () => {
    it('should rangeTo a selectionA', () => {
      const action = boundRangeTo('itemA')
      const initialState = {
        selectionA: setItems(['itemA', 'itemB', 'itemC'], init()),
      }
      const state = reducer(initialState, action)

      const expectedState = flow(
        init,
        setItems(['itemA', 'itemB', 'itemC']),
        rangeTo('itemA')
      )()

      expect(state.selectionA).to.deep.equal(expectedState)
    })
  })
})
