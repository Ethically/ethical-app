import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'ethical/react/helmet'

const Lazy = (props) => (
    <page>
        <Helmet>
            <title>Lazy!</title>
        </Helmet>
        <div>I was lazily loaded!</div>
        <Link to="/">Get back home...</Link>
    </page>
)

export default Lazy
