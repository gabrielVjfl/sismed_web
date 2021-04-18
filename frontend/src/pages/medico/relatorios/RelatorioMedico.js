import React, {useState, useEffect, useContext} from 'react';

import {TemplateWrapper, Content, ContentMain} from '../../styles/Styled'

import { UserContext } from "../../../services/context/contextApi/MedicoContext";

import { useHistory } from "react-router-dom";

import Axios from "axios";

import Navbar from "../../../components/Navbar";
import SideBarMedico from "../../../components/medico/SideBarMedico";

import {ContainerHome} from './styled'

import ListMedicoRelatorios from '../../../components/medico/ListMedicoRelatorios'



import { Layout } from 'antd';

const { Header, Footer, Sider } = Layout;




const RelatorioMedico = () => {

    const history = useHistory()

    const { state: stateuser } = useContext(UserContext);
    const { dispatch: userDispatch } = useContext(UserContext);

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
            auth: true,
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
               <h2 style={{fontFamily: 'Nunito', fontWeight: 700}}>Meus Relatórios</h2>
               <br/>
              
               <ListMedicoRelatorios/>
               </ContentMain>
           </Content>

      
    </TemplateWrapper>
    )
}

export default RelatorioMedico 