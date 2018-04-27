import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import createStore from '../shared/utilities/store'
import Routes from '../shared/Routes.js'

const render = () => {

    const store = createStore()

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
