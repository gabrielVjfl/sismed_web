import React, { useState, useEffect, useContext, StyleSheet } from "react";

import {
  CardHeader,
  TemplateError,
  MessageError,
  MyTable,
  Pagination,
  PaginationButton,
  PaginationItem,
} from "../styles/styled.js";

import Modal from '@material-ui/core/Modal';

import Axios from "axios";

import { RecepcionistaContext } from "../../services/context/contextApi/RecepcionistaContext";

import SendEmailPaciente from '../../pages/recepcionista/EmailPaciente.js'

import $ from "jquery";

import "../styles/style.css";

import { Table } from 'react-bootstrap'

import URL from '../../utils/URL'

import {Link, useHistory} from 'react-router-dom'

const ListRecepcionistaPaciente = () => {

  const history = useHistory()

  const { state: myuser } = useContext(RecepcionistaContext);

  const [list, setList] = useState([]);

  const [valueUrl, setValueUrl] = useState("1");

  const [limit, setLimit] = useState(5);

  const [pages, setPages] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [open, setOpen] = useState(false);

  const [idPaciente, setPacienteId] = useState(0)


  const handleOpen = (id) => {
    setOpen(true);
    
    setPacienteId(id)
  };

  const handleClose = () => {
    setOpen(false);
  };



  useEffect(() => {
    HandleListPacientes()
  }, [myuser.dados.id])

  useEffect(() => {
    HandleListPacientes()
  }, [valueUrl])

  useEffect(() => {
    HandleListPacientes()
  }, [currentPage])


  const HandleListPacientes = async() => {
      try {
      let response = await Axios.get(
      `${URL}/medicos/listparamspacientes/${myuser.dados.MedicoId}/${valueUrl}?page=${currentPage}`
          )

          setList(response.data.Pacientes)

      }
      catch(err) {
          console.log(err)
      }
  }
 
  

  $(document).ready(function () {
    $("#myinput").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#mytable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });

  const LinkToAddAgendamento = (id) => {
    history.push(`/adm/medico/post/agendamento/${id}`)
  }

  return (
    <div className="container">
      <div className="main">
        <div className="column">
         
       
          <div className="col-md">
          <button onClick={() => setValueUrl("1")} className="btn btn-primary">
           Mais Recentes
          </button>{' '}
          <button onClick={() => setValueUrl("3")} className="btn btn-warning">
           Mais Antigos
          </button>
          
            <div className="card">
            <input
              autoFocus={true}
              className="form-control"
              placeholder="Pesquisar"
              id="myinput"
            />
            <CardHeader color="orange" class="card-header">
              Meus Pacientes
            </CardHeader>

              <div className="card-body"></div>
             { list.length == 0 ? (
                    <div style={{textAlign: 'center'}}>
                  <h3 style={{color: 'red'}}>Sem pacientes</h3>
                    </div>
                  ) : ''
             }
              <div className="table-responsive">
                <Table id="mytable" Table responsive="md" striped bordered hover>
                  <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Rua</th>
                    <th>Bairro</th>
                    <th>Cidade</th>
                    <th>Ações</th>
                    
                  </tr>
                  </thead>
                 
                  {
                
                  list.map((list) => (
                    <tbody>
                    <tr key={list.id}>
                     
                      <td>{list.name}</td>
                      <td>{list.email}</td>
                      <td>{list.telefone}</td>
                      <td>{list.rua}</td>
                      <td>{list.bairro}</td>
                      <td>{list.cidade}</td>
                  <td><button className="btn btn-danger">Excluir</button>{' '}
                      <button className="btn btn-warning">Alterar</button>{' '}

                      <button className="btn btn-success"
                      onClick={() => handleOpen(list.id)}>
                        Enviar Email</button>{' '}{' '}
                      
        <button  style={{marginTop: '10px'}} className="btn btn-info"
         onClick={() => LinkToAddAgendamento(list.id)}>
                   Add Agendamento</button>{' '}

                      </td>
                    </tr>
                    </tbody>
                    
                  ))}
                
                </Table>
                <span style={{fontSize: '22px'}}>Pagina {currentPage}</span>

                <div style={{display:'flex',  justifyContent: 'center'}}>
                {
                  currentPage !== 1 ? (
                  <button className="btn btn-warning" 
              onClick={() => setCurrentPage(currentPage == 1 ? currentPage : currentPage - 1)}
                  style={{marginBottom: '30px'}}>
                    Anterior</button>
                  ) : ''
                }
                {
                  list.length !== 0 ? (
                    <button className="btn btn-success" 
                    onClick={() => setCurrentPage(currentPage + 1)} style={{marginBottom: '30px'}}>
                      Próximo</button>
                  ) : ''
                }
                <br/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
       </div>
       <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '50%', padding: 20, backgroundColor: 'white', overflow: 'auto'}}>
          
          <SendEmailPaciente myid={idPaciente} handleClose={handleClose}/>
          </div>
        </div>
       
      </Modal>
    </div>
  );
};

export default ListRecepcionistaPaciente
