import partialRight from 'lodash/partialRight'

const curryReducer = (reducer) => (action) => partialRight(reducer, action)

export default curryReducer
