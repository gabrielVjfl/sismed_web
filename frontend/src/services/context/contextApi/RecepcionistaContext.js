import React, {useReducer, createContext} from 'react'

import {InitialState, RecepcionistaReducer} from '../reducers/RecepcionistaReducer'

export const RecepcionistaContext = createContext()

export default ({children}) => {

const [state, dispatch] = useReducer(RecepcionistaReducer, InitialState)

    return (
<RecepcionistaContext.Provider value={{state, dispatch}}>
            {children}
</RecepcionistaContext.Provider>
    )
}