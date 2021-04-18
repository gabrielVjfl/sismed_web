import React, {useEffect, useContext} from 'react'


import Axios from 'axios'

import {RecepcionistaContext} from '../../services/context/contextApi/RecepcionistaContext'


import {useHistory} from 'react-router-dom'

// : ElementType
export default function PersistentRecep(WrappedComponent) {
  const Wrapper = (props) => {

    const {dispatch: userDispatch} = useContext(RecepcionistaContext)
    
      const history = useHistory()

      useEffect(() => {
   
        let res = sessionStorage.getItem('userRecepData')
        let resToken = sessionStorage.getItem('tokenRecep')
    
        if(res && resToken) {
    
        let json = JSON.parse(res)
        let mytoken = JSON.parse(resToken)
    
        console.log('Meus dados', json)
        console.log('Meu token', mytoken)
    
        Axios.defaults.headers.Authorization = `Bearer ${mytoken}`
        
    
        
        userDispatch({
            type: 'SETauth',
            payload: {
                auth: sessionStorage.getItem('tokenRecep')
            }
        })
        userDispatch({
            type: 'SETtoken',
            payload: {
                token: mytoken
            }
        })
    
     
    
        userDispatch({
            type: 'SETdata',
            payload: {
                dados: json
            }
        })
    
        }
        else {
            history.push('/')
        }
    }, [])
    


      return <WrappedComponent {...props}/>
    }
    return Wrapper
  }
