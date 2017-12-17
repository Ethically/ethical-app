import Root from 'ethical/react/root'
import React from 'react'
import { Route } from 'react-router-dom'
import { Helmet } from 'ethical/react/helmet'
import Home from './components/Home.js'
import Material from './components/Material.js'
import Lazy from './components/Lazy.js'
import Async from './components/Async.js'
import Redirect from './components/Redirect.js'
import Redirected from './components/Redirected.js'

export default (
    <Root>
        <Route path="/api" component={Home}/>
        <Helmet>
            <title>Default Title</title>
            <meta name="description" content="Default Description" />
        </Helmet>
        <Route exact path="/" component={Home}/>
        <Route path="/material" component={Material}/>
        <Route path="/lazy" component={Lazy}/>
        <Route path="/async" component={Async}/>
        <Route path="/redirect" component={Redirect}/>
        <Route path="/redirected" component={Redirected}/>
    </Root>
)
