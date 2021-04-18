import React, { Suspense, lazy, useContext } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "../pages/home/Home";
import LoginMedico from "../pages/auth/medico/SignIn";
import LoginPaciente from "../pages/auth/paciente/SignIn";
import LoginRecepcionista from "../pages/auth/recepcionista/SignIn";
import MaisInformacoes from "../pages/info/MaisInformacoes";
import Preload from "../pages/preload/Preload";

// PRIVATE ROUTE
import AdmMedico from "../pages/adm/AdmMedico";
import AdmPaciente from "../pages/adm/AdmPaciente";
import AdmRecepcionista from "../pages/adm/AdmRecepcionista";

// MEDICOS
import MedicoPacienteList from "../pages/medico/paciente/PacientesList";
import RelatorioMedico from '../pages/medico/relatorios/RelatorioMedico'


import PrivateRouteMedico from "./private/MedicoAuth";
import PrivateRoutePaciente from "./private/PacienteAuth";
import PrivateRouteRecep from "./private/RecepcionistaAuth";


import AddRelatorios from '../pages/medico/add/AddRelatorios'
import AddAgendamentos from '../pages/medico/add/AddAgendamento'

import PostAgendamento from '../pages/medico/add/PostAgendamento'
import PostRelatorios from '../pages/medico/add/PostRelatorios'

// Recepcionista
import PagePacientes from '../pages/recepcionista/PagePacientes'
import AddPacienteRecep from '../pages/recepcionista/AddPaciente'
import PageMedicoRecepcionista from '../pages/recepcionista/MedicoInfo'


import InfoMedico from '../components/recepcionista/InfoMedico'
import AddAgendamentoRecep from '../pages/recepcionista/AddAgendamento'

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="spinner-border text-primary" role="status"></div>
        }
      >
        <Switch>
            
        <Route path="/" exact component={Preload} />

        <PrivateRouteMedico
            isPrivate
            path="/adm/medico/relatorios"
            exact
            component={RelatorioMedico}
          />

        <PrivateRouteMedico
            isPrivate
            path="/adm/medico/addrelatorio"
            exact
            component={AddRelatorios}
          />

          <PrivateRouteMedico
            isPrivate
            path="/adm/medico/post/agendamento/:id"
            exact
            component={PostAgendamento}
          />
            <PrivateRouteMedico
            isPrivate
            path="/adm/medico/post/relatorios/:id"
            exact
            component={PostRelatorios}
          />

<PrivateRouteMedico
            isPrivate
            path="/adm/medico/addagendamento"
            exact
            component={AddAgendamentos}
          />




          <PrivateRouteMedico
            isPrivate
            path="/adm/medico"
            exact
            component={AdmMedico}
          />
          <PrivateRouteMedico
            isPrivate
            path="/adm/medico/list/pacientes"
            exact
            component={MedicoPacienteList}
          />
          <PrivateRoutePaciente
            isPrivate
            path="/adm/paciente"
            exact
            component={AdmPaciente}
          />
          <PrivateRouteRecep
            isPrivate
            path="/adm/recepcionista/add/agendamento"
            exact
            component={AddAgendamentoRecep}
          />
           <PrivateRouteRecep
            isPrivate
            path="/adm/recepcionista"
            exact
            component={AdmRecepcionista}
          />
           <PrivateRouteRecep
            isPrivate
            path="/adm/recepcionista/medicoinfo"
            exact
            component={PageMedicoRecepcionista}
          />

          <PrivateRouteRecep
            isPrivate
            path="/adm/recepcionista/pacientes"
            exact
            component={PagePacientes}
          />

           <PrivateRouteRecep
            isPrivate
            path="/adm/recepcionista/add/pacientes"
            exact
            component={AddPacienteRecep}
          />



        
          <Route path="/home" exact component={Home}></Route>
          <Route path="/medico/signin" exact component={LoginMedico} />
          <Route path="/paciente/signin" exact component={LoginPaciente} />
          <Route
            path="/recepcionista/signin"
            exact
            component={LoginRecepcionista}
          />

   
          <Route path="/info" exact component={MaisInformacoes} />

          <Redirect to="/"></Redirect>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
