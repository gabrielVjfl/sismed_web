import React, {useContext} from 'react'

import {UserContext} from '../services/context/contextApi/MedicoContext'




export const IsAuth = () => {

    const {state:myuser} = useContext(UserContext)
    
    let json = localStorage.getItem('userDataMedico')

    let response = JSON.parse(json)

    console.log('Minha resposta', response)

    if(response.token) {
        return true
    } // ou usar o localstorage
    else {
        return false
    }
}