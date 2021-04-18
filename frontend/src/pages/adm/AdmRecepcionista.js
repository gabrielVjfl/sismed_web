import React, {useState, useMemo, useEffect, useContext} from 'react'

import Axios from 'axios'

import PersistentRecep from '../../utils/persist/PersistentRecep'

import {RecepcionistaContext} from '../../services/context/contextApi/RecepcionistaContext'

import {useHistory} from 'react-router-dom'

import SideBarRecepcionista from '../../components/recepcionista/SideBarRecepcionista'

import {TemplateWrapper, Content, ContentMain} from '../styles/Styled'

import Navbar from "../../components/Navbar";

import AgendamentoRecepcionista from '../../components/recepcionista/AgendamentosPacientes'

import URL from '../../utils/URL'

const AdmRecepcionista = () => {

    const [agendamentos, setAgendamentos] = useState([])
    const [medico, setMedicos] = useState([])
    const [paciente, setPaciente] = useState([])
    const [error, setError] = useState('')
    const [total, setTotal] = useState([])

    

const {state: myuser} = useContext(RecepcionistaContext)



console.log('Meu id', myuser.dados.id)

const convertObjectArray = (obj) => {
    const array = [obj]
    return array
  }

  
useEffect(() => {
    HandleAgendamentos()
}, [myuser.dados.id])
  
const HandleAgendamentos = async() => {
    try {
   let response = await Axios.get
    (`${URL}/recepcionista/agendamentos/${myuser.dados.id}`)

    if(response) {

        const array = convertObjectArray(response.data.Medico)

        console.log('Array de medicos', array)


        console.log('Minha reposta', response.data)
        setAgendamentos(response.data.Agendamentos)

        setMedicos(array)

        setPaciente(response.data.Pacientes)
        setError('')
    }
    else {
    setError('Nenhum agendamento cadastrado no sistema!')
    }
    }
    catch(err) {
    console.log(err)
    setError('Nenhum agendamento cadastrado no sistema!')
    }
}



   return (
       <TemplateWrapper>
            <SideBarRecepcionista
            emailuser={myuser.dados.email}
            nameuser={myuser.dados.name}
            email={myuser.dados.email}
            title1="Agendamentos"
            title2="Pacientes"
            title3="Médico"
            addNovo1="Agendamento"
            addNovo2="Paciente"
            link1="/adm/recepcionista"
            link2="/adm/recepcionista/pacientes"
            link3="/adm/recepcionista/medicoinfo"
            link4="/adm/recepcionista/add/pacientes"
            link5="/adm/recepcionista/add/agendamento"
          ></SideBarRecepcionista>

          
       <Content>
    <Navbar name={myuser.dados.name}></Navbar>

    <ContentMain>
    <br/>
               <h2 style={{fontFamily: 'Nunito', fontWeight: 700}}>Agendamentos</h2>
    <br/>

    <AgendamentoRecepcionista/>
    </ContentMain>
    
       </Content>

       </TemplateWrapper>

   )
}
export default PersistentRecep(AdmRecepcionista)