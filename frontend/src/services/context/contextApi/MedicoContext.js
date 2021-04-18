import {createContext, useReducer} from 'react';

import {UserReducer, InitialState} from '../reducers/MedicoReducer'

export const UserContext = createContext()

export default ({children}) => {

const [state, dispatch] = useReducer(UserReducer, InitialState)

    return (
<UserContext.Provider value={{state, dispatch}}>
{children}
</UserContext.Provider>
    )
}