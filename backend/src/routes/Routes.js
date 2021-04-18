const express = require("express");

const route = express.Router();

const MedicoController = require("../controllers/MedicoController");

const RecepcionistaControllers = require("../controllers/RecepcionistaControllers");

const PacienteControllers = require("../controllers/PacienteControllers");

const AgendamentosControllers = require("../controllers/AgendamentosControllers");

const RelatoriosController = require("../controllers/RelatorioControllers");

const EmailService = require('../controllers/EmailService');

const multerConfig = require("../imgconfig/imgConfig");

const multer = require("multer");

// Middlewares auth
const MedicoAuthMiddleware = require("../middleware/MedicoAuthMiddleware");
const PacienteAuthMiddleware = require("../middleware/PacienteAuthMiddleware");
const RecepcionistaAuthMiddleware = require("../middleware/RecepcionistaAuthMiddleware");

// authParams
const RecepcionistaAuthParamsMiddleware = require("../middleware/params/RecepcionistaAuth");
const PacienteAuthParamsMiddleware = require("../middleware/params/PacienteAuth");
const MedicoAuthParamsMiddleware = require("../middleware/params/MedicoAuth");

route.get("/teste", (req, res) => {
  res.status(200).send("Teste");
});

// MÉDICOS -- update --delete
route.post("/medicos/create", MedicoController.register);
route.post("/medicos/login", MedicoController.login);
route.get("/medicos/listar", MedicoAuthMiddleware, MedicoController.index);

route.get(
  "/medicos/listarparamsrecep/:id",
//  MedicoAuthParamsMiddleware,
  MedicoController.recepcionista
);

route.get(
  "/medicos/listparamspacientes/:id/1",
 // MedicoAuthParamsMiddleware,
  MedicoController.pacientes
);

route.get(
  "/medicos/listparamspacientes/:id/3",
 // MedicoAuthParamsMiddleware,
  MedicoController.pacientesAscList
)


route.get(
  "/medicos/listparamspacientes/:id/2",
 // MedicoAuthParamsMiddleware,
  MedicoController.pacientesAsc
)
route.get(
  "/medicos/listparamsagendamentos/:id/1",
//  MedicoAuthParamsMiddleware,
  MedicoController.agendamentos
);
route.get(
  "/medicos/listparamsagendamentos/:id/2",
  //MedicoAuthParamsMiddleware,
  MedicoController.agendamentosOrder
);
route.get(
  "/medicos/listparamsagendamentosfilter",
 // MedicoAuthParamsMiddleware,
  MedicoController.agendamentosFilter
);
route.get(
  "/medicos/listparamsrelatorio/:id",
 // MedicoAuthParamsMiddleware,
 // recepcionista
  MedicoController.relatorio
);
route.get("/medicos/ok", MedicoAuthMiddleware, MedicoController.ok);
route.get("/medicos/list/agendamentos/date/:id",  MedicoController.agendamentosDate)


// Privar rota com medicoId ou id...
route.get('/medicos/pacientes/:id',  MedicoController.indexParamsPaciente)

// RECEPCIONISTA
route.post("/recepcionista/create", RecepcionistaControllers.register);
route.post("/recepcionista/login", RecepcionistaControllers.login);


route.get(
  "/recepcionista/listarparams/:id",
 // RecepcionistaAuthParamsMiddleware,
  RecepcionistaControllers.indexparams
);
route.get("/recepcionista/list/pacientes/:id",  RecepcionistaControllers.listPacientes)

route.get(
  "/recepcionista/agendamentos/:id",
 // RecepcionistaAuthParamsMiddleware,
  RecepcionistaControllers.agendamentos
);

// PACIENTE -- update -- delete
route.post("/pacientes/create", PacienteControllers.create); // middleware recepcionista

route.post("/pacientes/login", PacienteControllers.login);

route.get("/pacientes/list",  PacienteControllers.index);

route.get(
  "/pacientes/agendamentos/:id",
  //PacienteAuthParamsMiddleware,
  PacienteControllers.agendamentos
);

route.get(
  "/pacientes/medico/:id",
  //PacienteAuthParamsMiddleware,
  PacienteControllers.medico
);

route.get(
  "/pacientes/agendamentos/:id",
 // PacienteAuthParamsMiddleware,
  PacienteControllers.agendamentos
);

route.get(
  "/pacientes/relatorios/:id",
  //PacienteAuthParamsMiddleware,
  PacienteControllers.relatorios
);
// AGENDAMENTOS -- update -- delete

route.post(
  "/agendamentos/create",
 
  AgendamentosControllers.create
); // Middleware Recepcionista

route.post("/agendamentos/create/medico", 
  MedicoAuthMiddleware,
  AgendamentosControllers.create
  )

route.get('/agendamentos/count/:medicoId', AgendamentosControllers.countAgendadas)

// RELATÓRIOS -- Middleware Médico
route.post(
  "/relatorios/create",
  multer(multerConfig).single('file'),
  RelatoriosController.create
);

route.get("/relatorios/list/:MedicoId",  RelatoriosController.list)
route.get("/relatorios/list/filter/:MedicoId", RelatoriosController.listFilter)
// Email


route.post('/email/send', multer(multerConfig).single('file'), EmailService.send)

module.exports = route;
