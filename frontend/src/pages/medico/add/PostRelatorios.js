import React, { useContext, useState, useEffect } from "react";

import { UserContext } from "../../../services/context/contextApi/MedicoContext";

import { useHistory, useParams } from "react-router-dom";

import Axios from "axios";

import PersistentMedico from '../../../utils/persist/PersisentMedico'

import URL from "../../../utils/URL";

import Navbar from "../../../components/Navbar";
import SideBarMedico from "../../../components/medico/SideBarMedico.js";
import { Layout } from 'antd';

import Loading from '../../../utils/Loading'

import {TemplateWrapper, Content, ContentMain} from '../../styles/Styled'

const { Header, Footer, Sider} = Layout;

const PostRelatorios = () => {

    const { state, dispatch } = useContext(UserContext);

const [descricao, setDescricao] = useState('')
const [medicamentos, setMedicamentos] = useState('')

const [medicoId, setMedicoId] = useState(state.dados.id)
const [selectedFile, setSelectedFile] = useState(null)

const [loading, setLoading] = useState(false)
const [sucMsg, setSucMsg] = useState(false)
const [errMsg, setErrMsg] = useState(false)

const [pacientesName, setPacientesName] = useState('');
const [pacienteId, setPacienteId] = useState(0)

const history = useHistory();

const {id} = useParams()

useEffect(() => {
    HandlePaciente(id)
}, [id])


    const HandlePaciente = async (id) => {
        try {
          let response = await Axios.get(
            `${URL}/medicos/pacientes/${state.dados.id}?idPaciente=${id}`
          );
        
  
          setPacientesName(response.data[0].Pacientes[0].name)
          setPacienteId(response.data[0].Pacientes[0].id)
  
   
  
        } catch (err) {
          console.log(err);
        }
      };
    

    const onFileChange =  (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const HandleSubmit = async (e) => {
        try {
         e.preventDefault()

         setLoading(true)

         const data = new FormData()

         data.append('descricao', descricao)
         data.append('medicamentos', medicamentos)
         data.append('pacienteId', pacienteId)
         data.append('file', selectedFile, selectedFile.name)
         data.append('medicoId', medicoId)

         console.log('Meu arquivo', selectedFile)
        
         let response = await Axios.post(`${URL}/relatorios/create`, data)
         console.log(response)

         setLoading(false)

      setDescricao('')
       setMedicamentos('')
       setPacienteId('')
       setSelectedFile('')

       setSucMsg(true)
       setErrMsg(false)
        }
        catch(err) {
            console.log(err)
            setErrMsg(err.response.data.errBackend)
            setLoading(false)
            setSucMsg(false)
        }
    }

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
                    <h1 style={{fontFamily: 'Nunito', fontWeight: '700', fontSize: '25px'}}>Adicionar Relatório</h1>
 
        <div className="card">
            <div className="card-body">
            <form onSubmit={HandleSubmit}>
            <label for="descricao">Descrição :</label><br/>
        <textarea
         name="descricao"
          placeholder="Digite uma descrição"
           className="form-control"
            required
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            />
        <br/>
        <label for="medicamentos">Medicamentos</label>
        <br/>
        <textarea 
        name="medicamentos"
         placeholder="Digite os medicamentos preescritos"
          className="form-control"
           required
           value={medicamentos}
           onChange={(e) => setMedicamentos(e.target.value)}
           />
        <br/>
        <label for="paciente">Paciente</label>
        <br/>
        <select name="pacienteId"  onChange={(e) => setPacienteId(e.target.value)} className="form-control">
              <option value={pacienteId}>{pacientesName}</option>
              
            </select>
        <br/>
        <label>Arquivo :</label><br/>
      <input required type="file" id="real-file" className="form-control" onChange={onFileChange}/>
        <br/>
       
        <button type="submit" style={{marginLeft: '0.5vw'}} className="btn btn-success">Salvar</button>
    </form>
   <br/>
   {
     loading == true ? (
       <Loading></Loading>
     ) : ''
   }
   {
     sucMsg == true ? (
      <div className="alert alert-success" role="alert">
      Relatório feito!
    </div>
     ) : ''
   }
   {
     errMsg ? (
      <div className="alert alert-danger" role="alert">
       {errMsg}
    </div>
     ) : ''
   }
   <br/>
            </div>
        </div>
       

              
        </ContentMain>
        
          </Content>
           
      
        </TemplateWrapper>
    )
}

export default PersistentMedico(PostRelatorios)