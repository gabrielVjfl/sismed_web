import React, { useState, useEffect, useContext } from "react";

import style from './styled.css'

import {TemplateWrapper, Content, ContentMain} from '../styles/Styled'
import { UserContext } from "../../services/context/contextApi/MedicoContext";

import { useHistory } from "react-router-dom";

import Axios from "axios";

import Navbar from "../../components/Navbar";
import SideBarMedico from "../../components/medico/SideBarMedico.js";

import URL from '../../utils/URL'

import PersistentMedico from '../../utils/persist/PersisentMedico'

import ListMedicoAgendamento from "../../components/medico/ListMedicoAgendamento";

import {ContainerHome} from './styled'

import { Layout } from 'antd';

const { Header, Footer, Sider } = Layout;

const AdmMedico = () => {
  const [pacientes, setPacientes] = useState([]);

  const [open, setOpen] = useState(true);

  const history = useHistory();

  const { state: stateuser } = useContext(UserContext);
  const { dispatch: userDispatch } = useContext(UserContext);

  const getPacientes = async () => {
    try {
      let response = await Axios.get(
        // ou usar o id localstorage para atuaizar
        `${URL}/medicos/listparamspacientes/${stateuser.dados.id}`
      );

      setPacientes(response.data.Pacientes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPacientes();
  }, [stateuser.dados.id]); // colocar id

 


  const openSide = () => {
    if (open == true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
<TemplateWrapper>

         <SideBarMedico
            emailuser={stateuser.dados.email}
            nameuser={stateuser.dados.name}
            email={stateuser.dados.email}
            title1="Agendamentos"
            title2="Pacientes"
            title3="Relatórios"
            addNovo1="Agendamento"
            addNovo2="Relatório"
            link1="/adm/medico"
            link2="/adm/medico/list/pacientes"
            link3="/adm/medico/relatorios"
          ></SideBarMedico>
        

             <Content>
             <Navbar name={stateuser.dados.name} />

             <ContentMain>
               <br/>
               <h2 style={{fontFamily: 'Nunito', fontWeight: 700}}>Meus Agendamentos</h2>
               <br/>
            <ListMedicoAgendamento />
            </ContentMain>
           </Content>
            
        
     </TemplateWrapper>
  );
};
export default PersistentMedico(AdmMedico)
