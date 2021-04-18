import React, {createContext, useReducer} from 'react'


import {PacienteReducer, InitialState} from '../reducers/PacienteReducer'

export const PacienteContext = createContext()

export default ({children}) => {

    const [state, dispatch] = useReducer( PacienteReducer, InitialState)

    return (
        <PacienteContext.Provider value={{state, dispatch}}>
            {children}
        </PacienteContext.Provider>
    )
}

