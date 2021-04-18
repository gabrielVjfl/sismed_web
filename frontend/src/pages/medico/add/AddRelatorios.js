import React, {useState, useContext, useEffect} from 'react'
import Axios from 'axios'
import { UserContext } from "../../../services/context/contextApi/MedicoContext";
import { useHistory } from "react-router-dom";
import URL from "../../../utils/URL";
import Loading from '../../../utils/Loading'
import PersistentMedico from '../../../utils/persist/PersisentMedico'
const AddRelatoriosMedico = ({HandleCloseTwo}) => {

    const history = useHistory();

  const { state, dispatch } = useContext(UserContext);

const [descricao, setDescricao] = useState('')
const [medicamentos, setMedicamentos] = useState('')
const [pacienteId, setPacienteId] = useState('')
const [medicoId, setMedicoId] = useState(null)
const [selectedFile, setSelectedFile] = useState(null)


const [pacientes, setPacientes] = useState([])
const [loading, setLoading] = useState(false)
const [sucMsg, setSucMsg] = useState(false)
const [errMsg, setErrMsg] = useState(false)

console.log('Minha descricao', descricao)
console.log('Minha medicamentos', medicamentos)
console.log('Minha paciente', pacienteId)
console.log('medicoo', medicoId)
console.log('minha foto', selectedFile)



    useEffect(() => {
    HandlePaciente();
    }, [state.dados.id])

    const HandlePaciente = async () => {
        try {
          let response = await Axios.get(
            `${URL}/medicos/listparamspacientes/${state.dados.id}/2`
          );
    
          console.log("Minha resposta de pacientes", response.data.Pacientes);
    
          setPacientes(response.data.Pacientes);
        } catch (err) {
          console.log(err);
        }
      };

      const onFileChange = (e) => { 
        // ONCHANGE DAS IMAGEMS
        setSelectedFile(e.target.files[0]); 
        console.log(e.target.files[0])
      }; 
      
      const HandleSubmit = async(e) => {
          try {
          e.preventDefault()

          setLoading(true)

          const data = new FormData()

          data.append('descricao', descricao)
          data.append('medicamentos', medicamentos)
          data.append('pacienteId', pacienteId)
          data.append('file', selectedFile, selectedFile.name)
          data.append('medicoId', state.dados.id) 

        

           let response = await Axios.post(`${URL}/relatorios/create`, data)
               

        setLoading(false)
      
       setDescricao('')
       setMedicamentos('')
       setPacienteId('')
       setSelectedFile('')

       setSucMsg(true)

       
       setTimeout(() => {
       window.location.reload()
       }, 2000)


          }
          catch(err) {
              console.log(err)
              setErrMsg(err.response.data.errBackend)
              setLoading(false)
          }
      }

      console.log(selectedFile)

      const fileData = () => { 
   
        if(selectedFile) { 
            
          return ( 
            <div> 
              <h2 id="details">Detalhes do arquivo :</h2> 
              <p id="details">Nome do Arquivo : {selectedFile.name}</p> 
              <p id="details">Tipo do arquivo : {selectedFile.type}</p> 
              <p id="details"> 
                Data do arquivo: {" "} 
                {selectedFile.lastModifiedDate.toDateString()} 
              </p> 
            </div> 
          ); 
        } else { 
          return ( 
            <div> 
              <br /> 
            
            </div> 
          ); 
        } 
      }; 


    return (
    <div>
        <h1 style={{fontFamily: 'Nunito', fontWeight: '700', fontSize: '25px'}}>Adicionar Relatório</h1>
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
        <select name="pacienteId" onChange={(e) => setPacienteId(e.target.value)} 
        className="form-control" required>
            <option value="">Selecione um paciente</option>
            {
                pacientes.map(item => 
                <option key={item.id} value={item.id}>{item.name} - {item.email}</option>
            )
            }
        </select>
        <br/>
        <label>Arquivo :</label><br/>
      <input required type="file" id="real-file" className="form-control" onChange={onFileChange}/>
        <br/>
        <button className="btn btn-danger" onClick={HandleCloseTwo}>Fechar</button>
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
    {fileData()}
    </div>
    )
}
export default PersistentMedico(AddRelatoriosMedico)