import React from 'react';
import {Route, Redirect} from 'react-router-dom'

const PrivateRoutePaciente = ({component: Component, ...rest}) => {

let json = localStorage.getItem('pacienteToken')

let resData = JSON.parse(json)

return (
    <Route {...rest} render={props => (
        resData ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{pathname: '/', state: {from: props.location}}}/>
        )
    )}/>
)

}
export default PrivateRoutePaciente