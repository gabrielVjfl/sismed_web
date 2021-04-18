import React, {useState,  useEffect, useContext} from 'react'


import PersistentRecep from '../../utils/persist/PersistentRecep'
import {RecepcionistaContext} from '../../services/context/contextApi/RecepcionistaContext'


import {TemplateWrapper, Content, ContentMain} from '../styles/Styled'
import SideBarRecepcionista from '../../components/recepcionista/SideBarRecepcionista'
import Navbar from "../../components/Navbar";
import InfoMedico from '../../components/recepcionista/InfoMedico'
const PageMedicoRecepcionista = () => {

  const {state: myuser} = useContext(RecepcionistaContext)


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
       <h2 style={{fontFamily: 'Nunito', fontWeight: 700}}>Informações do médico</h2>
<br/>

<InfoMedico/>


</ContentMain>

</Content>

</TemplateWrapper>

                
      
   )
}
export default PersistentRecep(PageMedicoRecepcionista)