import { expect } from 'chai'
import flow from 'lodash/flow'
import bind from 'lodash/bind'
import { init, setItems, removeAll, toggle } from 'yourchoice'
import { reducer, actions } from '../src'

const boundRemove = bind(actions.removeAll, null, 'selectionA')

describe('removeAll', () => {
  describe('action', () => {
    it('should return action including type and payload', () => {
      const action = boundRemove()

      expect(action).to.have.property('type', 'yourchoice-redux/REMOVE_ALL')
      expect(action.payload).to.deep.equal({ selectionName: 'selectionA' })
    })
  })

  describe('reducer', () => {
    it('should remove all from selection', () => {
      const initialState = {
        selectionA: flow(
          setItems(['itemA', 'itemB', 'itemC']),
          toggle('itemA'),
          toggle('itemB')
        )(init()),
      }

      const action = boundRemove()
      const state = reducer(action, initialState)

      const expectedState =
        removeAll(initialState.selectionA)

      expect(state.selectionA).to.deep.equal(expectedState)
    })

    it('should do nothing if nothing if nothing is selected', () => {
      const initialState = {
        selectionA: setItems(['itemA', 'itemB', 'itemC', 'itemD'], init()),
      }

      const action = boundRemove()
      const state = reducer(action, initialState)

      const expectedState = flow(
                setItems(['itemA', 'itemB', 'itemC', 'itemD']),
                removeAll
            )(initialState.selectionA)

      expect(state.selectionA).to.deep.equal(expectedState)
    })
  })
})
