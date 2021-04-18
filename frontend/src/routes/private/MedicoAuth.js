import React, {useContext} from 'react'

import {Route, Redirect} from 'react-router-dom'

import {UserContext} from '../../services/context/contextApi/MedicoContext'

const PrivateRouteMedico = ({component: Component, ...rest}) => {

    const {state} = useContext(UserContext)

    //let json = sessionStorage.getItem('medicoToken')

   // let resData = JSON.parse(json)
    
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

export default PrivateRouteMedico