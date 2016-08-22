import { expect } from 'chai'
import flow from 'lodash/flow'
import bind from 'lodash/bind'
import { init, setItems, remove, setSelection } from 'yourchoice'
import { reducer } from '../src'
import { removeActionCreator } from '../src/remove'

const boundRemove = bind(removeActionCreator, null, 'selectionA')

describe('remove', () => {
  describe('action', () => {
    it('should return action including type and payload', () => {
      const action = boundRemove('itemA')

      expect(action).to.have.property('type', 'yourchoice-redux/REMOVE')
      expect(action.payload).to.deep.equal({
        selectionName: 'selectionA',
        itemId: 'itemA',
      })
    })
  })

  describe('reducer', () => {
    it('should remove item from selection on empty state', () => {
      const action = boundRemove('itemA')
      const initialState = {
        selectionA: setItems(['itemA', 'itemB', 'itemC'], init()),
      }
      const state = reducer(initialState, action)

      const expectedState = flow(
        init,
        setItems(['itemA', 'itemB', 'itemC']),
        remove('itemA')
      )()

      expect(state.selectionA).to.deep.equal(expectedState)
    })

    it('should remove item from selection', () => {
      const initialState = {
        selectionA: flow(
          init,
          setItems(['itemA', 'itemB', 'itemC']),
          setSelection(['itemC', 'itemB'])
        )(),
      }

      const action = boundRemove('itemB')
      const state = reducer(initialState, action)

      const expectedState =
        remove('itemB', initialState.selectionA)

      expect(state.selectionA).to.deep.equal(expectedState)
    })
  })
})
