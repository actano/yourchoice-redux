import { expect } from 'chai'
import flow from 'lodash/flow'
import bind from 'lodash/bind'
import { init, setItems } from 'yourchoice'
import { reducer } from '../src'
import { setItemsActionCreator } from '../src/setItems'

const boundSetItems = bind(setItemsActionCreator, null, 'selectionA')

describe('setItems', () => {
  describe('action', () => {
    it('should return action including type and payload', () => {
      const action = boundSetItems(['itemA', 'itemB'])
      expect(action).to.have.property('type', 'yourchoice-redux/SET_ITEMS')
      expect(action.payload).to.deep.equal({
        selectionName: 'selectionA',
        items: ['itemA', 'itemB'],
      })
    })
  })

  describe('reducer', () => {
    it('should set items in selectionA', () => {
      const action = boundSetItems(['itemA', 'itemB'])
      const initialState = {
        selectionA: setItems(['itemC'], init()),
      }

      const state = reducer(action, initialState)

      const expectedState = flow(
        init,
        setItems(['itemA', 'itemB'])
      )()

      expect(state.selectionA).to.deep.equal(expectedState)
    })
  })
})
