import React, {useEffect, useContext} from 'react'

import Axios from 'axios'

import {UserContext} from '../../services/context/contextApi/MedicoContext'

import {useHistory} from 'react-router-dom'

// :ElementType

export default function PersistentMedico(WrappedComponent) {
  const Wrapper = (props) => {

    const {dispatch: userDispatch} = useContext(UserContext)
    
      const history = useHistory()

      useEffect(() => {
        let res = sessionStorage.getItem("userDataMedico");
        let resToken = sessionStorage.getItem("medicoToken");

        if (res && resToken) {
          let json = JSON.parse(res);
          let jsonToken = JSON.parse(resToken);

          // Permite acessar as rotas protegidas do backend
          Axios.defaults.headers.Authorization = `Bearer ${jsonToken}`;

          userDispatch({
            type: "SETdados",
            payload: {
              dados: json,
            },
          });
          userDispatch({
            type: "SETauth",
            payload: {
              auth: sessionStorage.getItem('medicoToken'),
            },
          });
          userDispatch({
            type: "SETtoken",
            payload: {
              token: jsonToken,
            },
          });
          userDispatch({
            type: "SETloading",
            payload: {
              loading: false,
            },
          });
        } else {
          history.push("/");
        }
      }, []);
    


      return <WrappedComponent {...props}/>
    }
    return Wrapper
  }
