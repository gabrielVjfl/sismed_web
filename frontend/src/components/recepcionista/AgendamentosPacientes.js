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

import Axios from "axios";

import { RecepcionistaContext } from "../../services/context/contextApi/RecepcionistaContext";

import $ from "jquery";

import dayjs from "dayjs";

import URL from '../../utils/URL'


import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "../styles/style.css";

import "../styles/style.css";

import {Table, Modal, Button} from 'react-bootstrap'


const AgendamentoRecepcionista = () => {
  const { state: myuser } = useContext(RecepcionistaContext);

  const [list, setList] = useState([]);

  const [listDate, setListDate] = useState([]);

  const [errorDate, setErrorDate] = useState("");

  const [valueUrl, setValueUrl] = useState("1");

  const [valueCalendar, setValueCalendar] = useState(new Date());

  const [count, setCount] = useState(0);

  const [pages, setPages] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  let formatoDay = dayjs(valueCalendar).format("YYYY-MM-DD");

  console.log("Nova data", formatoDay);

  console.log("Meu valor", valueUrl);

  console.log("Meus contagem", count);

  useEffect(() => {
    HandleList();
  }, [currentPage]);

  useEffect(() => {
    HandleList();
  }, [valueUrl]);

  useEffect(() => {
    HandleList();
  }, [myuser.dados.id]);

  const HandleList = async () => {
    try {
      let response = await Axios.get(
    `${URL}/medicos/listparamsagendamentos/
    ${myuser.dados.MedicoId}/${valueUrl}?page=${currentPage}`
      );
      console.log("Meus dados", response.data);
      setList(response.data.Agendamentos);
    } catch (err) {}
  };

  useEffect(() => {
    HandleListDate();
  }, [valueCalendar]);

  useEffect(() => {
    HandleListDate();
  }, [myuser.dados.id]);

  const HandleListDate = async () => {
    try {
      let response = await Axios.get(
    `${URL}/medicos/list/agendamentos/date/${myuser.dados.MedicoId}?day=${formatoDay}`
      );
      setListDate(response.data.Agendamentos);
      console.log("Minha resposta", response.data);

      setErrorDate("");
    } catch (err) {
      setListDate(null); // lista de agendamentos

      setErrorDate (
        "Nenhum Agendamento para esse dia... Utilize o filtro do calendário!"
      );
    }
  };


  

  console.log("Minhas paginas", pages);

  $(document).ready(function () {
    $("#myinput").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#mytable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });

  return (
    <div className="container">
      <div className="main">
        <div className="row">
          <div className="col-md">
            <Calendar
              className="c1"
              defaultValue={new Date()}
              onChange={setValueCalendar}
              value={valueCalendar}
            />
          </div>
          <br />
          <div className="col-md">
            
            <div className="card" >
            <CardHeader  color="orange" className="card-header">
              Agendamentos Hoje 
            </CardHeader>
              <div className="card-body"></div>

              {listDate == null ? (
                <TemplateError>
                  <MessageError>
                    Nenhum Agendamento para esse dia!... Utilize o filtro do
                    calendário!
                  </MessageError>
                </TemplateError>
              ) : (
                <div className="table-responsive">
                <Table Table responsive="md" id="mytable" striped bordered hover>
                  <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Paciente</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                  </tr>
                  </thead>
                  {listDate.map((list) => (
                    <tbody>
                    <tr key={list.id}>
                      <td>{list.descricao}</td>
                      <td>{dayjs(list.day).format("DD/MM/YYYY")}</td>
                      <td>{list.hora}</td>
                      <td>{list.Paciente.name}</td>
                      <td>{list.Paciente.email}</td>
                      <td>{list.Paciente.telefone}</td>
                      <td>
                        <button className="btn btn-warning">Alterar</button>{' '}
                        <button className="btn btn-danger">Excluir</button>
                      </td>
                    </tr>
                    </tbody>
                  ))}
                </Table>
                </div>
              )}
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-md">
            <button
              onClick={() => setValueUrl("1")}
              className="btn btn-primary"
            >
              Mais recentes
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => setValueUrl("2")}
              className="btn btn-danger"
            >
              Mais Antigos
            </button>

            <input
              autoFocus={true}
              className="form-control"
              placeholder="Pesquisar"
              id="myinput"
            />
            
            <div className="card">
            <CardHeader color="orange" class="card-header">
              
              Agendamentos | Total {list.length}
            </CardHeader>
              <div className="card-body"></div>
              {list.length <= 0 ? (
                <TemplateError>
                  <MessageError>
                    <span>Página sem agendamentos!</span>
                  </MessageError>
                </TemplateError>
              ) : (
                <div className="table-responsive">
               <Table Table responsive="md" id="mytable" striped bordered hover>
                  <thead>
                  <tr>
                  
                    <th>Descrição</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Nome do Paciente</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                  </tr>
                  </thead>
                  {list.map((list) => (
                        <tbody>
                    <tr key={list.id}>
                  
                      <td>{list.descricao}</td>
                      <td>{dayjs(list.day).format("DD/MM/YYYY")}</td>
                      <td>{list.hora}</td>
                      <td>{list.Paciente.name}</td>
                      <td>{list.Paciente.email}</td>
                      <td>{list.Paciente.telefone}</td>
                      <td>
                      <button className="btn btn-warning">Alterar</button>{' '}
                      <button className="btn btn-danger">Excluir</button>
                      </td>
                     
                    </tr>
                    </tbody>
                  ))}
                </Table>
                </div>
              )}

              <span
                style={{
                  fontSize: 21,
                  marginLeft: 10,
                  marginBottom: 10,
                  color: "blue",
                }}
              >
                Pagina {currentPage}
              </span>
            </div>
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "30%",
              }}
            >
              <Pagination>
                <button
                  style={{ marginRight: 10 }}
                  className="btn btn-success"
                  onClick={() =>
                    setCurrentPage(
                      currentPage == 1 ? currentPage : currentPage - 1
                    )
                  }
                >
                  Anterior
                </button>

                {list.length <= 0 ? (
                  <div></div>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Próximo
                  </button>
                )}
              </Pagination>
            </div>
          </div>
        </div>

        <br />
        <br />
      </div>
    </div>
  );
};

export default AgendamentoRecepcionista;
