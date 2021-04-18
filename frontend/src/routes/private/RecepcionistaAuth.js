import React, {useContext} from 'react'

import {Route, Redirect} from 'react-router-dom'


import {RecepcionistaContext} from '../../services/context/contextApi/RecepcionistaContext'
const PrivateRouteRecep = ({component: Component, ...rest}) => {

const {state} = useContext(RecepcionistaContext)

    return (
        <Route {...rest} render={props => (
            state.auth ? (
                <Component {...props}/>

            ) : (
                <Redirect to={{pathname: '/', state: {from: props.location}}}/>
            )
        )}/>
    )
}
export default PrivateRouteRecep