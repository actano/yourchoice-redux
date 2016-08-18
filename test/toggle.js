import { expect } from 'chai'
import flow from 'lodash/flow'
import bind from 'lodash/bind'
import { init, setItems, toggle, setSelection } from 'yourchoice'
import { reducer } from '../src'
import { toggleActionCreator } from '../src/toggle'

const boundToggle = bind(toggleActionCreator, null, 'selectionA')

describe('toggle', () => {
  describe('action', () => {
    it('should return action including type and payload', () => {
      const action = boundToggle('rowA')

      expect(action).to.have.property('type', 'yourchoice-redux/TOGGLE')
      expect(action.payload).to.deep.equal({
        selectionName: 'selectionA',
        itemId: 'rowA',
      })
    })
  })

  describe('reducer', () => {
    it('should toggle unselected tree row to be selected', () => {
      const initialState = {
        selectionA: flow(
            init,
            setItems(['rowA', 'rowB', 'rowC']),
            setSelection(['rowB', 'rowC'])
        )(),
      }
      const action = boundToggle('rowA')
      const state = reducer(action, initialState)

      expect(state.selectionA).to.deep.equal(toggle('rowA', initialState.selectionA))
    })

    it('should toggle selected tree row to be unselected', () => {
      const initialState = {
        selectionA: flow(
          init,
          setItems(['rowA', 'rowB', 'rowC']),
          setSelection(['rowA', 'rowB', 'rowC'])
        )(),
      }
      const action = boundToggle('rowA')
      const state = reducer(action, initialState)

      expect(state.selectionA).to.deep.equal(toggle('rowA', initialState.selectionA))
    })
  })
})
