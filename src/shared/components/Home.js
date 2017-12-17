import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'ethical/react/helmet'

const Home = () => {
    return (
        <page>
            <Helmet>
                <title>Home!</title>
            </Helmet>
            <div>Welcome Home...</div>
            <div><Link to='/lazy'>Click to lazy load a component!</Link></div>
            <div><Link to='/material'>Click to see a material component!</Link></div>
        </page>
    )
}

export default Home
