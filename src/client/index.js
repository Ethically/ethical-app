import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware  } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import isNode from 'ethical/helper/is-node'
import reducer from '../shared/reducers/index.js'
import Routes from '../shared/Routes.js'

const render = () => {

    const reducers = combineReducers(reducer)
    const store = createStore(reducers, window.state, applyMiddleware(thunk))

    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                {Routes}
            </BrowserRouter>
        </Provider>,
        document.querySelector('ethical-root')
    )
}

render()
