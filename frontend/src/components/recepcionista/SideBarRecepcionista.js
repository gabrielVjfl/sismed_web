import React, { useContext, useState } from "react";

import Axios from "axios";

import {
  ContainerSideBar,
  HeaderSideBar,
  TextSideBarHeader,
  ButtonDeslogar,
  TemplateSideBar,
  TitleSideBar,
  TitleCreate,
  TemplateSideBarOption,
} from "../styled/styled.js";

import Gravatar from "react-gravatar";

import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

import "../styled/styled.css";

import Modal from "@material-ui/core/Modal";

import {
  FaCalendarAlt,
  FaUsers,
  FaClipboardList,
  FaPlus,
  FaEnvelope,
} from "react-icons/fa";

import { RecepcionistaContext } from "../../services/context/contextApi/RecepcionistaContext";

import AddAgendamentosMedico from "../../pages/medico/add/AddAgendamento.js";
import AddPacienteRecep from "../../pages/recepcionista/AddPaciente";



const SideBarRecepcionista = (props) => {
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [openDeslogar, setOpenDeslogar] = useState(false);
 

  const history = useHistory();

  const { state: stateuser } = useContext(RecepcionistaContext);
  const { dispatch: userDispatch } = useContext(RecepcionistaContext);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const HandleCloseTwo = () => {
    setOpenTwo(false);
  };

  const HandleOpenTwo = () => {
    setOpenTwo(true);
  };

  const HandleCloseDeslogar = () => {
    setOpenDeslogar(false);
  };

  const HandleOpenDeslogar = () => {
    setOpenDeslogar(true);
  };

  const Deslogar = () => {
    userDispatch({
      type: "SETdados",
      payload: {
        dados: [],
      },
    });
    userDispatch({
      type: "SETauth",
      payload: {
        auth: "",
      },
    });

    userDispatch({
      type: "SETtoken",
      payload: {
        token: "",
      },
    });

  

    sessionStorage.removeItem("userRecepData");
    sessionStorage.removeItem("tokenRecep");

    Axios.defaults.headers.Authorization = undefined;

    history.push("/");
  };

  
  return (
    <ContainerSideBar>
      <HeaderSideBar>
        <Gravatar
          id="gravatar"
          default="mm"
          email={props.email}
          size={100}
        ></Gravatar>

        <TextSideBarHeader>{props.nameuser}</TextSideBarHeader>
        <TextSideBarHeader>{props.email}</TextSideBarHeader>

        <div
          style={{
            display: "flex",
            padding: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextSideBarHeader>Online</TextSideBarHeader>

          <div
            style={{
              height: 20,
              width: 20,
              marginLeft: 5,
              borderRadius: 10,
              backgroundColor: "green",
              marginTop: 5,
            }}
          ></div>
        </div>

        <ButtonDeslogar onClick={HandleOpenDeslogar} className="btn btn-danger">
          Sair
        </ButtonDeslogar>

        <br />
      </HeaderSideBar>

      <TemplateSideBar>
        <TitleSideBar>
          <Link to={props.link1}>
            <TemplateSideBarOption>
              {props.title1}

              {(props.title1 == "Agendamentos" && (
                <FaCalendarAlt id="icon" size={20} color="orange" />
              )) ||
                (props.title1 == "Agendamentos" && (
                  <FaCalendarAlt size={20} color="black" />
                ))}
            </TemplateSideBarOption>
          </Link>
        </TitleSideBar>

        <TitleSideBar>
          <Link to={props.link2}>
            <TemplateSideBarOption>
              {props.title2}
              {props.title2 == "Pacientes" && (
                <FaUsers id="icon" size={22} color="red" />
              )}
            </TemplateSideBarOption>
          </Link>
        </TitleSideBar>

        <TitleSideBar>
          <Link to={props.link3}>
            <TemplateSideBarOption>
              {props.title3}
              {props.title3 == "Relatórios" && (
                <FaClipboardList id="icon" size={18} color="blue" />
              )}
              {
                props.title3 == 'Médico' && (
                  <FaUsers id="icon" size={18} color="white"/>
                )
              }
            </TemplateSideBarOption>{" "}
          </Link>
        </TitleSideBar>


        <TitleCreate>
          <TemplateSideBarOption>Adicionar</TemplateSideBarOption>
        </TitleCreate>

        <TitleSideBar >
        <Link style={{color: '#31A17E'}} to={props.link5}>
          <TemplateSideBarOption>
            {props.addNovo1}
          </TemplateSideBarOption>
          </Link>
        </TitleSideBar>

        <TitleSideBar>
          
        <Link style={{color: '#31A17E'}} to={props.link4}>
          <TemplateSideBarOption>
            {props.addNovo2}
          </TemplateSideBarOption>
        </Link>
        </TitleSideBar>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{ width: "50%", padding: 20, backgroundColor: "white" }}
            >
              <AddAgendamentosMedico handleClose={handleClose} />
            </div>
          </div>
        </Modal>

        <Modal
          open={openTwo}
          onClose={HandleCloseTwo}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

            }}
          >
            <div
              style={{ width: "50vw", overflow: 'auto', padding: 20, backgroundColor: "white" }}
            >
              <AddPacienteRecep HandleCloseTwo={HandleCloseTwo} />
              
            </div>
          </div>
        </Modal>


        <Modal
          open={openDeslogar}
          onClose={HandleCloseDeslogar}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{ width: "50%", padding: 20, backgroundColor: "white" }}
            >
              <h3 style={{ fontFamily: "Nunito", fontWeight: "700" }}>
                Deseja sair ?{" "}
              </h3>
              <button onClick={HandleCloseDeslogar} className="btn btn-warning">
                Não
              </button>

              <button
                className="btn btn-danger"
                style={{ marginLeft: "0.5vw" }}
                onClick={Deslogar}
                className="btn btn-danger"
              >
                Sim
              </button>
            </div>
          </div>
        </Modal>
      </TemplateSideBar>
    </ContainerSideBar>
  );
};
export default SideBarRecepcionista
