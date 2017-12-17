import React from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'ethical/react/helmet'
import { Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

const Material = () => (
    <page>
        <Helmet>
            <title>Material!</title>
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
        </Helmet>
        <MuiThemeProvider>
            <div>
                <RaisedButton label="A Styled Button" />
                <Link style={{ padding: '20px' }} to="/">
                    Get back home...
                </Link>
            </div>
        </MuiThemeProvider>
    </page>
)

export default Material
