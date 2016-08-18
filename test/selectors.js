import { expect } from 'chai'
import flow from 'lodash/flow'

import { selectors } from '../src'
import {
  init,
  setItems,
  setSelection,
  toggle,
  getSelection,
  getChangedSelection,
  getChangedDeselection,
  getItems,
} from 'yourchoice'

describe('selectors', () => {
  let initialState = undefined

  beforeEach(() => {
    initialState = {
      selectionA: flow(
        setItems(['itemA', 'itemB', 'itemC']),
        setSelection(['itemA', 'itemC']),
        toggle('itemC')
      )(init()),
    }
  })

  describe('getSelection', () => {
    it('should return the same selection as yourchoice', () => {
      expect(selectors.getSelection(initialState.selectionA))
        .to.deep.equal(getSelection(initialState.selectionA))
    })
  })

  describe('getChangedSelection', () => {
    it('should return the same changed selection as yourchoice', () => {
      expect(selectors.getChangedSelection(initialState.selectionA))
        .to.deep.equal(getChangedSelection(initialState.selectionA))
    })
  })

  describe('getChangedDeselection', () => {
    it('should return the same changed deselection as yourchoice', () => {
      expect(selectors.getChangedDeselection(initialState.selectionA))
        .to.deep.equal(getChangedDeselection(initialState.selectionA))
    })
  })

  describe('getItems', () => {
    it('should return the same selectable items as yourchoice', () => {
      expect(selectors.getItems(initialState.selectionA))
        .to.deep.equal(getItems(initialState.selectionA))
    })
  })
})
