import React, { useContext, useState, useEffect } from "react";

import { UserContext } from "../../../services/context/contextApi/MedicoContext";

import { useHistory } from "react-router-dom";

import Axios from "axios";

import URL from "../../../utils/URL";

import Swall from 'sweetalert2'

import PersistentMedico from '../../../utils/persist/PersisentMedico'

const AddAgendamentosMedico = ({handleClose}) => {
  const history = useHistory();

  const { state, dispatch } = useContext(UserContext);

  console.log("Meu id", state.dados.id);

  const [descricao, setDescricao] = useState("");
  const [day, setDay] = useState("");
  const [hora, setHora] = useState("");
  const [status, setStatus] = useState("PENDENTE");
  const [pacienteId, setPacienteId] = useState(0);
  const [medicoId, setMedicoId] = useState(null);
  const [recepcionistaId, setRecepcionistaId] = useState(0);

  const [pacientes, setPacientes] = useState([]);

  const [sucMsg, setSucMsg] = useState(false);
  const [errMsg, setErrMsg] = useState('')

console.log('Escolha do paciente', pacienteId)
console.log('minha recepcionista', recepcionistaId)
console.log('Meu medico', medicoId)

 

 
 

  useEffect(() => {
    HandlePaciente();
  }, [state.dados.id]);

  useEffect(() => {
    HandlePaciente();
  }, [])

  const HandlePaciente = async () => {
    try {
      let response = await Axios.get(
        `${URL}/medicos/listparamspacientes/${state.dados.id}/2`
      );

      console.log("Minha resposta de pacientes", response.data.Pacientes);

      setPacientes(response.data.Pacientes);
      setRecepcionistaId(response.data.Pacientes[0].RecepcionistaId)

     


    } catch (err) {
      console.log(err);
    }
  };

  const HandleSubmit = async (e) => {
    try {
      e.preventDefault();

      let response = await Axios.post(`${URL}/agendamentos/create`, {
        descricao: descricao,
        day: day,
        hora: hora,
        status: status,
        pacienteId: pacienteId,
        medicoId: state.dados.id,
        recepcionistaId: recepcionistaId,
      });

      console.log("Minha resposta do post", response.data);

      setDescricao("")
      setDay("")
      setHora("")
      setStatus("")
      setPacienteId("")


      setSucMsg(true)
      setErrMsg(false)
     

      setTimeout(() => {
      window.location.reload(1)
      }, 2000)

    } catch (err) {
        setSucMsg(false)
        setErrMsg(err.response.data.errBackend)
         
    }
  };

  return (
    <div>
      <h1 style={{fontFamily: 'Nunito', fontWeight: '700', fontSize: '25px'}}>Adicionar Agendamento</h1>

      <form onSubmit={HandleSubmit}>
        <div className="card">
          <div className="card-body">
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
            <select name="status"  onChange={(e) => setStatus(e.target.value)} className="form-control">
              <option value="PENDENTE">Escolha o status</option>
              <option value="PENDENTE">Pendente</option>
              <option value="CONCLUÍDO">Concluído</option>
            </select>
            <br />

            <label>Pacientes</label>
            <br />
            <select required name="pacienteId" onChange={(e) => setPacienteId(e.target.value)} className="form-control">
              <option value="">Selecione um paciente</option>
              {pacientes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - {item.email}
                </option>
              ))}
            </select>

            <br />

            <button className="btn btn-danger" 
            onClick={handleClose}>Fechar</button>

            <button type="submit"  style={{marginLeft: '0.5vw'}} className="btn btn-success">
              Salvar
            </button>
            <br/>
            <br/>
            {
                sucMsg == true ? (
                    <div className="alert alert-success" role="alert">
                      Agendamento Salvo!
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

            
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersistentMedico(AddAgendamentosMedico);
