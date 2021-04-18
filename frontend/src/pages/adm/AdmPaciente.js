import React, {useState,  useEffect, useContext} from 'react'
import Axios from 'axios'
import {useHistory} from 'react-router-dom'

import {PacienteContext} from '../../services/context/contextApi/PacienteContext'

import URL from '../../utils/URL'
import dayjs from 'dayjs'
const AdmPaciente = () => {

  const {state: myuser} = useContext(PacienteContext)
  const {dispatch: userDispatch} = useContext(PacienteContext)

  const [agendamentos, setAgendamentos] = useState([])

  const history = useHistory()

  const ListAgendamentos = async() => {
    try {
    let response = await 
    Axios.get(`${URL}/pacientes/agendamentos/${myuser.user.id}`)

    console.log(response.data.Agendamentos)

    // if(response == 0) ==> msgError('Sem agendamentos')

    setAgendamentos(response.data.Agendamentos)
  
    }
    catch(err) {
    console.log(err)

    }
}
useEffect(() => {
    ListAgendamentos()
}, [myuser.user.id])

  useEffect(() => {
      let res = localStorage.getItem('userDataPaciente')
      let resToken = localStorage.getItem('pacienteToken')

      if(res && resToken) {
          let json = JSON.parse(res)
          let jsonToken = JSON.parse(resToken)

          Axios.defaults.headers.Authorization = `Bearer ${jsonToken}`

          userDispatch({
              type: 'SETuser',
              payload: {
                  user: json
              }
          })
          userDispatch({
              type: 'SETauth',
              payload: {
                  auth: true
              }
          })
          userDispatch({
              type: 'SETtoken',
              payload: {
                  token: jsonToken
              }
          })
          userDispatch({
              type: 'SETloading',
              payload: {
                  loading: false
              }
          })

      }
    else {
        history.push('/')
    }
  }, [])

  function deslogar() {
      
      userDispatch({
          type: 'SETuser',
          payload: {
              user: []
          }
      })

      userDispatch({
          type: 'SETauth',
          payload: {
              auth: false
          }
      })

      userDispatch({
          type: 'SETtoken',
          payload: {
          token: ''
          }
      })

      localStorage.removeItem('userDataPaciente')
      localStorage.removeItem('pacienteToken')
      Axios.defaults.headers.Authorization = undefined
      history.push('/')
     
  }
 
   return (
       <div>
           <h1>Painel administrativo Paciente</h1>
        <h2>{myuser.user.name}</h2>

        <span>Meus Agendamentos : </span>
        {
            agendamentos.map(agendamentos => 
                <div key={agendamentos.id}>
                    <p>Descricao: {agendamentos.descricao}</p>
                    <p>Data e hora : {dayjs(agendamentos.day).format('DD/MM/YYYY, hh:mm')}</p>
                </div>
                )
        }
           <button onClick={() => deslogar()} className="btn btn-danger">Sair</button>
       </div>
   )
}
export default AdmPaciente