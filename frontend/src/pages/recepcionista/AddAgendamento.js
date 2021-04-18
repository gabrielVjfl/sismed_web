import React, { useState, useContext, useEffect } from "react";

import Axios from "axios";

import PersistentRecep from "../../utils/persist/PersistentRecep";
import { RecepcionistaContext } from "../../services/context/contextApi/RecepcionistaContext";

import { TemplateWrapper, Content, ContentMain } from "../styles/Styled";
import SideBarRecepcionista from "../../components/recepcionista/SideBarRecepcionista";
import Navbar from "../../components/Navbar";
import URL from "../../utils/URL.jsx";
import Swal from "sweetalert2";
import Loading from "../../utils/Loading";

const AddAgendamentoRecep = () => {
  const { state:state } = useContext(RecepcionistaContext);

  const [loading, setLoading] = useState(false);

  const [listPacientes, setListPacientes] = useState([]);

  const [descricao, setDescricao] = useState("");
  const [day, setDay] = useState("");
  const [hora, setHora] = useState("");
  const [status, setStatus] = useState("");
  const [pacienteId, setPacienteId] = useState(0);
  const [medicoId, setMedicoId] = useState(null);
  const [recepcionistaId, setRecepcionistaId] = useState(null);

  useEffect(() => {
    HandleGetPacientes();
  }, []);

  useEffect(() => {
    HandleGetPacientes();
  }, [state.dados.id]);

  const HandleGetPacientes = async () => {
    try {
      let response = await Axios.get(
        `${URL}/recepcionista/list/pacientes/${state.dados.id}`
      );

      console.log(response.data);

      setListPacientes(response.data[0].Pacientes);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleSubmit = async(e) => {
      try {
          e.preventDefault()
          setLoading(true)
      let response = await Axios.post(`${URL}/agendamentos/create`, {
          descricao:descricao,
          day:day,
          hora:hora,
          status:status,
          pacienteId:pacienteId,
          medicoId: state.dados.MedicoId,
          recepcionistaId: state.dados.id
      })

      console.log(response)

      setDescricao("")
      setDay("")
      setHora("")
      setStatus("")
      setPacienteId("")

      setLoading(false)

      Swal.fire({
        title: 'Sucesso!',
        text: 'Agendamento Cadastrado!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      }
      catch(err) {
        setLoading(false)
        Swal.fire({
            title: 'Erro!',
            text: err.response.data.errBackend,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          console.log(err)
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
          <br />
          <h2 style={{ fontFamily: "Nunito", fontWeight: 700 }}>
            Adicionar Agendamento
          </h2>
          <br />
          <div className="container">
            <div className="main">
              <div className="row">
                <div className="col-md">
                  <div className="card">
                    <div className="card-body">
                      <form onSubmit={HandleSubmit}>
                        <label for="descricao">Descrição : </label>
                        <textarea
                          autoFocus={true}
                          className="form-control"
                          required
                          value={descricao}
                          name="descricao"
                          placeholder="Digite uma descrição"
                          onChange={(e) => setDescricao(e.target.value)}
                        />
                        <br />

                        <label for="day">Dia {state.dados.MedicoId} : </label>
                        <input
                          type="date"
                          name="day"
                          value={day}
                          className="form-control"
                          required
                          onChange={(e) => setDay(e.target.value)}
                        />
                        <br />
                        <label for="hora">Hora : </label>
                        <input
                          type="time"
                          className="form-control"
                          required
                          value={hora}
                          name="hora"
                          onChange={(e) => setHora(e.target.value)}
                        />
                        <br />

                        <label for="status">Status :</label>
                        <br />
                        <select
                          name="status"
                          onChange={(e) => setStatus(e.target.value)}
                          className="form-select"
                          value={status}
                        >
                          <option value="PENDENTE">Escolha o status</option>
                          <option value="PENDENTE">Pendente</option>
                          <option value="CONCLUÍDO">Concluído</option>
                        </select>
                        <br />
                        <label for="pacientes">Pacientes</label>
                        <br />
                        <select
                          required
                          name="pacienteId"
                          value={pacienteId}
                          onChange={(e) => setPacienteId(e.target.value)}
                          className="form-select"
                        >
                          <option value="">Selecione um paciente</option>
                          {listPacientes.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name} - {item.email}
                            </option>
                          ))}
                        </select>

                        <br />

                        <button type="submit" className="btn btn-primary">
                          {loading == true ? (
                            <Loading />
                          ) : (
                            <span>Salvar Paciente</span>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>

                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </ContentMain>
      </Content>
    </TemplateWrapper>
  );
};
export default PersistentRecep(AddAgendamentoRecep);
