import React, { useContext, useState, useEffect } from "react";

import { UserContext } from "../../../services/context/contextApi/MedicoContext";

import { useHistory, useParams } from "react-router-dom";

import Axios from "axios";

import {TemplateWrapper, Content, ContentMain} from '../../styles/Styled'

import URL from "../../../utils/URL";

import Swal from 'sweetalert2'
import Navbar from "../../../components/Navbar";
import SideBarMedico from "../../../components/medico/SideBarMedico.js";
import { Layout } from 'antd';

import PersistentMedico from '../../../utils/persist/PersisentMedico'


const { Header, Footer, Sider } = Layout;


const PostAgendamento = () => {


  const {id} = useParams()

  useEffect(() => {
    HandlePaciente(id)
  }, [id])


    const { state, dispatch } = useContext(UserContext);
  
    console.log("Meu id", state.dados.id);
  
    const [descricao, setDescricao] = useState("");
    const [day, setDay] = useState("");
    const [hora, setHora] = useState("");
    const [status, setStatus] = useState("PENDENTE");
    
    const [medicoId, setMedicoId] = useState(state.dados.id);
    const [recepcionistaId, setRecepcionistaId] = useState(0);
  
    const [pacientesName, setPacientesName] = useState('');
    const [pacienteId, setPacienteId] = useState(0)
  

  
    
    const HandlePaciente = async (id) => {
      try {
        let response = await Axios.get(
          `${URL}/medicos/pacientes/${state.dados.id}?idPaciente=${id}`
        );
      

        setPacientesName(response.data[0].Pacientes[0].name)
        setPacienteId(response.data[0].Pacientes[0].id)

 

      setRecepcionistaId(response.data[0].Pacientes[0].RecepcionistaId)

      console.log('Minha recepcionista', response.data[0].Pacientes[0].RecepcionistaId)

      } catch (err) {
        console.log(err);
      }
    };
  
    const HandleSubmit = async (e) => {
      try {
        e.preventDefault();
  
        let response = await Axios.post(`${URL}/agendamentos/create/medico`, {
          descricao: descricao,
          day: day,
          hora: hora,
          status: status,
          pacienteId: pacienteId,
          medicoId: medicoId,
          recepcionistaId: recepcionistaId,
        });
  
        console.log("Minha resposta do post", response);
  
        setDescricao("")
        setDay("")
        setHora("")
        setStatus("")
        setPacienteId("")
  
        Swal.fire({
          title: 'Sucesso!',
          text: 'Agendamento Cadastrado!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })

      } 
      catch (err) {
        Swal.fire({
          title: 'Erro!',
          text: err.response.data.errBackend,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
       
           
      }
    };
  

    return (
    <TemplateWrapper>


<SideBarMedico
   emailuser={state.dados.email}
   nameuser={state.dados.name}
   email={state.dados.email}
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
    <Navbar name={state.dados.name} />
      <ContentMain>
      <br/>
      <h2 style={{fontFamily: 'Nunito', fontWeight: 700}}>Cadastrar Agendamento</h2>
      <br/>
      <div className="container">
      <div className="main">
        <div className="column">
         
       
          <div className="col-md">
      <form onSubmit={HandleSubmit}>
        <div className="card" >
          <div className="card-body" style={{textAlign: 'center'}}>
            <label>Descrição : </label>
            <br />
            <textarea
              autoFocus={true}
              className="form-control"
              placeholder="Digite a descrição"
              required
              value={descricao}
              name="descricao"
              onChange={(e) => setDescricao(e.target.value)}
           
            />
            <br />
            <label>Dia : </label>
            <br />
            <input 
            type="date"
             className="form-control"
             required
             value={day}
             name="day"
             onChange={(e) => setDay(e.target.value)}
              />
            <br />
            <br />
            <label>Hora :</label>
            <br />
            <input 
            type="time"
             className="form-control"
             required
             value={hora}
             name="hora"
             onChange={(e) => setHora(e.target.value)}
              />
            <br />

            <label>Status :</label>
            <br />
            <select name="status"  onChange={(e) => setStatus(e.target.value)} className="form-select">
              <option value="PENDENTE">Escolha o status</option>
              <option value="PENDENTE">Pendente</option>
              <option value="CONCLUÍDO">Concluído</option>
            </select>
            <br />
            <label>Status :</label>
            <br />
            <select name="pacienteId"  onChange={(e) => setPacienteId(e.target.value)} className="form-select">
              <option value={pacienteId}>{pacientesName}</option>
              
            </select>
            <br />

         
            <button type="submit"  style={{marginLeft: '0.5vw'}} className="btn btn-success">
              Salvar
            </button>
            <br/>
            <br/>
          </div>
        </div>
      </form>
      </div>
      </div>
      </div>
      </div>
      </ContentMain>
  </Content>

</TemplateWrapper>
    )
}

export default PersistentMedico(PostAgendamento)