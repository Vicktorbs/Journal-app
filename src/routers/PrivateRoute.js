import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    localStorage.setItem('lastLocation', rest.location.pathname)

    return (
        <Route { ...rest }
            component={ (props) => (
                (isAuthenticated) ?
                    (<Component { ...props } />) :
                    (<Redirect to='/auth/login' />)
            )}
        />
    )
}

PrivateRoute.protoTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}