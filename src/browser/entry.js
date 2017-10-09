import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware  } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import isNode from 'ethical-utility-is-node'
import PromiseProvider from 'ethical-react-component-provider-promise'
import reducer from '../shared/reducers/index.js'
import Routes from '../shared/Routes.js'

const render = () => {

    if (isNode()) {
        return
    }

    const reducers = combineReducers(reducer)
    const store = createStore(reducers, window.state, applyMiddleware(thunk))

    ReactDOM.render(
        <PromiseProvider>
            <Provider store={store}>
                <BrowserRouter>
                    {Routes}
                </BrowserRouter>
            </Provider>
        </PromiseProvider>,
        document.querySelector('ethical-root')
    )
}

render()
