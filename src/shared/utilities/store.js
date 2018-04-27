import { createStore, combineReducers, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import isNode from 'ethical/helper/is-node'
import reducer from '../reducers'

const reducers = combineReducers(reducer)
const middlewares = composeWithDevTools(applyMiddleware(thunk))
const state = ( isNode() ? undefined : window.state )

export default () => createStore(reducers, state, middlewares)
