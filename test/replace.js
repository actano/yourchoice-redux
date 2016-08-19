import { expect } from 'chai'
import flow from 'lodash/flow'
import bind from 'lodash/bind'
import { init, setItems, replace } from 'yourchoice'
import { reducer } from '../src'
import { replaceActionCreator } from '../src/replace'

const boundReplace = bind(replaceActionCreator, null, 'selectionA')

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
    it('should replace existing selection', () => {
      const initialState = {
        selectionA: setItems(['itemA', 'itemB', 'itemC'], init()),
      }

      const action = boundReplace('itemA')
      const state = reducer(initialState, action)

      const expectedState =
                replace('itemA', initialState.selectionA)

      expect(state.selectionA).to.deep.equal(expectedState)
    })

    it('should update list of items and then update selection', () => {
      const initialState = {
        selectionA: setItems(['itemA', 'itemB', 'itemC', 'itemD'], init()),
      }

      const action = boundReplace('itemD')
      const state = reducer(initialState, action)

      const expectedState = flow(
                setItems(['itemA', 'itemB', 'itemC', 'itemD']),
                replace('itemD')
            )(initialState.selectionA)

      expect(state.selectionA).to.deep.equal(expectedState)
    })
  })
})
