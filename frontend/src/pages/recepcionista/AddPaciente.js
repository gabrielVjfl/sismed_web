import React, {useContext, useState} from 'react'
import Axios from 'axios'

import PersistentRecep from '../../utils/persist/PersistentRecep'
import {RecepcionistaContext} from '../../services/context/contextApi/RecepcionistaContext'

import {TemplateWrapper, Content, ContentMain} from '../styles/Styled'
import SideBarRecepcionista from '../../components/recepcionista/SideBarRecepcionista'
import Navbar from "../../components/Navbar";
import URL from '../../utils/URL.jsx'
import Swal from 'sweetalert2'
import Loading from '../../utils/Loading'
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";

const AddPacienteRecep = () => {

    const {state} = useContext(RecepcionistaContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cpf, setCpf] = useState('')
    const [rua, setRua] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [numero, setNumero] = useState('')
    const [medicoId, setMedicoId] = useState(state.dados.MedicoId)
    const [RecepcionistumId, setRecepcionistumId] = useState(state.dados.id)
    const [recepcionistaId, setrecepcionistaId] = useState(state.dados.id)
    const [loading, setLoading] = useState(false)
    const [mask, setMask] = useState("");


    const HandleSubmit = async(e) => {
       try {
           e.preventDefault()
           setLoading(true)
       let response = await Axios.post(`${URL}/pacientes/create`, {
       name,
       email,
       password,
       telefone,
       cpf,
       rua,
       bairro,
       cidade,
       numero,
       medicoId,
       RecepcionistumId,
       recepcionistaId
       })
       console.log(response)

       setName('')
       setEmail('')
       setPassword('')
       setTelefone('')
       setCpf('')
       setRua('')
       setBairro('')
       setCidade('')
       setNumero('')

       Swal.fire({
        title: 'Paciente Salvo!',
        text:'Paciente salvo com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'

      })
      setLoading(false)

       }
       catch(err) {
        setLoading(false)
           Swal.fire({
            title: 'Ocorreu um erro!',
            text: err.response.data.errBackend,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    
       }
    }
    return (
        <TemplateWrapper>
    <SideBarRecepcionista
    emailuser={state.dados.email}
    nameuser={state.dados.name}
    email={state.dados.email}
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
<Navbar name={state.dados.name}></Navbar>

<ContentMain>
<br/>
       <h2 style={{fontFamily: 'Nunito', fontWeight: 700}}>Adicionar Paciente</h2>
<br/>
<div className="container">
            <div className="main">
                <div className="row">
                    <div className="col-md">
<div className="card">
  <div className="card-body">

 
            <form onSubmit={HandleSubmit}>
        <label>Nome Completo :</label>
        <input 
        type="text" 
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control"
         autoFocus={true} 
         placeholder="Digite o nome completo"
         />
        <br/>

        <label>Email :</label>
        <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        value={email}
        className="form-control" 
        placeholder="Digite o email"/>
        <br/>

        <label>Senha :</label>
        <input
         type="password"
         onChange={(e) => setPassword(e.target.value)}
         value={password}
          className="form-control"
           placeholder="Digite uma senha"
           name="password"
           />
        <br/>
        
        <label>Telefone :</label>
        <input 
        type="text" 
        value={telefone}
        className="form-control"
        onChange={(e) => setTelefone(e.target.value)}
         placeholder="Digite o telefone"
         name="telefone"
         />
        <br/>

        <label>Cpf - Cnpj :</label>
        <CpfCnpj
        value={cpf}
        name="cpf"
        placeholder="Digite o seu cpf ou cnpj"
        required
        className="form-control"
        onChange={(event, type) => {
          setCpf(event.target.value);
          setMask(type === "CPF");
        }}
      />
        <br/>

        <label>Rua :</label>
        <input 
        type="text"
        value={rua}
        onChange={(e) => setRua(e.target.value)}
         className="form-control"
          placeholder="Digite o nome da rua"
          name="rua"
          />
        <br/>

        <label>Bairro :</label>
        <input 
        type="text"
        value={bairro}
        onChange={(e) => setBairro(e.target.value)}
         className="form-control"
          placeholder="Digite o bairro"
          name="bairro"
          />
        <br/>

        <label>Cidade :</label>
        <input 
        type="text"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
         className="form-control"
          placeholder="Digite o nome da cidade"
          name="cidade"
          />
        <br/>

        <label>Número :</label>
        <input
         type="text"
         value={numero}
         onChange={(e) => setNumero(e.target.value)}
         className="form-control"
          placeholder="Número do endereço"
          name="numero"
          />
 
       <br/>
       

       <button type="submit"  className="btn btn-primary">
           {
               loading == true ? (
                   <Loading/>
               ) : <span>Salvar Paciente</span>
           }
           </button>

     </form>
     </div>
     </div>
     <br/>
        <br/>
                    </div>
                </div>
            </div>
        </div>

</ContentMain>

</Content>

</TemplateWrapper>
    )
}
export default PersistentRecep(AddPacienteRecep)